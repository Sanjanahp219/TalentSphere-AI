const crypto = require('crypto');
const { Op } = require('sequelize');

const User = require('../model/user.model');
const { signToken, JWT_EXPIRES_IN } = require('../utils/jwt');
const { sendPasswordResetEmail } = require('../services/mailer.service');

const RESET_TOKEN_TTL_MINUTES = 30;

const hashResetToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

/**
 * POST /api/auth/register
 * Self-registration. The role is always 'employee' here — privileged accounts
 * are created by an admin through the admin endpoint, never by the caller.
 */
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existing) {
            return res.status(409).json({ message: 'An account with that email already exists' });
        }

        const user = await User.create({ name, email, password, role: 'employee' });
        const token = signToken(user);

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            expiresIn: JWT_EXPIRES_IN,
            user
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.scope('withPassword').findOne({
            where: { email: email.toLowerCase() }
        });

        // Same response for unknown email and wrong password so the endpoint
        // cannot be used to enumerate registered accounts.
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'This account has been deactivated' });
        }

        user.lastLoginAt = new Date();
        await user.save();

        const token = signToken(user);

        return res.status(200).json({
            message: 'Logged in successfully',
            token,
            expiresIn: JWT_EXPIRES_IN,
            user
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * GET /api/auth/me — returns the authenticated user, used by the frontend to
 * validate a stored token on page load.
 */
const me = async (req, res) => {
    return res.status(200).json({ user: req.user });
};

/**
 * PATCH /api/auth/password
 */
const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.scope('withPassword').findByPk(req.user.id);
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        user.updatedBy = user.id;
        await user.save();

        // The old token stays valid until it expires; the client should replace
        // it with this one.
        return res.status(200).json({
            message: 'Password updated successfully',
            token: signToken(user),
            expiresIn: JWT_EXPIRES_IN
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * POST /api/auth/logout
 * Tokens are stateless, so this only tells the client to drop its copy. It
 * exists so the frontend has one endpoint to call for session teardown.
 */
const logout = async (req, res) => {
    return res.status(200).json({ message: 'Logged out successfully' });
};

/**
 * POST /api/auth/forgot-password
 * Always answers 200 with the same message — telling the caller whether an
 * address is registered would turn this into an account-enumeration oracle.
 */
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const genericResponse = {
            message: 'If an account exists for that email, a reset link has been sent.'
        };

        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user || !user.isActive) {
            return res.status(200).json(genericResponse);
        }

        // The raw token goes in the email; only its hash is persisted.
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetTokenHash = hashResetToken(resetToken);
        user.resetTokenExpiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);
        await user.save();

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

        try {
            await sendPasswordResetEmail({
                to: user.email,
                name: user.name,
                resetUrl,
                expiresInMinutes: RESET_TOKEN_TTL_MINUTES
            });
        } catch (mailError) {
            // Don't leave a usable token behind if the email never went out.
            user.resetTokenHash = null;
            user.resetTokenExpiresAt = null;
            await user.save();
            return next(mailError);
        }

        return res.status(200).json(genericResponse);
    } catch (error) {
        return next(error);
    }
};

/**
 * POST /api/auth/reset-password
 * Consumes the token from the reset email and sets the new password.
 */
const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        const user = await User.scope('withResetToken').findOne({
            where: {
                resetTokenHash: hashResetToken(token),
                resetTokenExpiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: 'This reset link is invalid or has expired' });
        }

        user.password = password;
        // Single use: burn the token so the link cannot be replayed.
        user.resetTokenHash = null;
        user.resetTokenExpiresAt = null;
        await user.save();

        return res.status(200).json({
            message: 'Password reset successfully, you can now log in'
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * POST /api/auth/users — admin-only account creation, the one path that can
 * assign a privileged role.
 */
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existing) {
            return res.status(409).json({ message: 'An account with that email already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'employee',
            createdBy: req.user.id
        });

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        return next(error);
    }
};

exports = module.exports = {
    register,
    login,
    me,
    changePassword,
    logout,
    forgotPassword,
    resetPassword,
    createUser
};
