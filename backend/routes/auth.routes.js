const express = require('express');
const { body, query } = require('express-validator');
const rateLimit = require('express-rate-limit');

const authController = require('../controllers/auth.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate');
const User = require('../model/user.model');

const router = express.Router();

// Credential endpoints are the ones worth brute-forcing, so they get a tighter
// budget than the rest of the API. Each endpoint gets its own limiter instance —
// a shared one would make a burst of logins lock out registration too.
const makeLimiter = ({ windowMs, limit, skipSuccessfulRequests = false }) => rateLimit({
    windowMs,
    limit,
    skipSuccessfulRequests,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Too many attempts, please try again later' }
});

// Only failed attempts count, so an active user is never locked out of their
// own account by using it normally.
const loginLimiter = makeLimiter({ windowMs: 15 * 60 * 1000, limit: 10, skipSuccessfulRequests: true });
const passwordLimiter = makeLimiter({ windowMs: 15 * 60 * 1000, limit: 10, skipSuccessfulRequests: true });
const registerLimiter = makeLimiter({ windowMs: 60 * 60 * 1000, limit: 5 });
// Every request here sends an email, so successful ones must count too —
// otherwise the endpoint becomes a free mail-bomb relay.
const forgotPasswordLimiter = makeLimiter({ windowMs: 60 * 60 * 1000, limit: 5 });

const passwordRules = (field = 'password') => body(field)
    .isString()
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain a number');

router.post(
    '/register',
    registerLimiter,
    [
        body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name is required'),
        body('email').isEmail().withMessage('A valid email is required').trim().toLowerCase(),
        passwordRules()
    ],
    validate,
    authController.register
);

router.post(
    '/login',
    loginLimiter,
    [
        body('email').isEmail().withMessage('A valid email is required').trim().toLowerCase(),
        body('password').notEmpty().withMessage('Password is required')
    ],
    validate,
    authController.login
);

router.get('/me', authenticate, authController.me);

router.post('/logout', authenticate, authController.logout);

router.patch(
    '/password',
    authenticate,
    passwordLimiter,
    [
        body('currentPassword').notEmpty().withMessage('Current password is required'),
        passwordRules('newPassword')
    ],
    validate,
    authController.changePassword
);

router.post(
    '/forgot-password',
    forgotPasswordLimiter,
    [body('email').isEmail().withMessage('A valid email is required').trim().toLowerCase()],
    validate,
    authController.forgotPassword
);

router.get(
    '/verify-reset-token',
    [query('token').isString().notEmpty().withMessage('Reset token is required')],
    validate,
    authController.verifyResetToken
);

router.post(
    '/reset-password',
    passwordLimiter,
    [
        body('token').isString().notEmpty().withMessage('Reset token is required'),
        passwordRules()
    ],
    validate,
    authController.resetPassword
);

router.post(
    '/users',
    authenticate,
    authorize('admin'),
    [
        body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name is required'),
        body('email').isEmail().withMessage('A valid email is required').trim().toLowerCase(),
        passwordRules(),
        body('role').optional().isIn(User.ROLES).withMessage(`Role must be one of: ${User.ROLES.join(', ')}`)
    ],
    validate,
    authController.createUser
);

exports = module.exports = router;
