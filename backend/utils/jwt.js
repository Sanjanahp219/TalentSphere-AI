const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set. Refusing to start without a signing secret.');
}

const signToken = (user) => jwt.sign(
    { sub: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN, issuer: 'talentsphere-ai' }
);

const verifyToken = (token) => jwt.verify(token, JWT_SECRET, { issuer: 'talentsphere-ai' });

exports = module.exports = { signToken, verifyToken, JWT_EXPIRES_IN };
