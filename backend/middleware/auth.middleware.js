const { verifyToken } = require('../utils/jwt');
const User = require('../model/user.model');

/**
 * Verifies the Bearer token and loads the current user onto req.user.
 * The user is re-read on every request so deactivated accounts lose access
 * immediately instead of when their token expires.
 */
const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        const [scheme, token] = header.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const payload = verifyToken(token);
        const user = await User.findByPk(payload.sub);

        if (!user || !user.isActive) {
            return res.status(401).json({ message: 'Account is no longer active' });
        }

        req.user = user;
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired, please log in again' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};

/**
 * Route guard for role-based access, e.g. authorize('admin', 'manager').
 * Must be used after authenticate.
 */
const authorize = (...allowedRoles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'You do not have access to this resource' });
    }
    return next();
};

exports = module.exports = { authenticate, authorize };
