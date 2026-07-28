const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db.config');

const SALT_ROUNDS = 12;

const ROLES = ['admin', 'manager', 'employee'];

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
        // Emails are stored lowercase so lookups are case-insensitive.
        set(value) {
            this.setDataValue('email', String(value || '').trim().toLowerCase());
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM(...ROLES),
        allowNull: false,
        defaultValue: 'employee'
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    lastLoginAt: {
        type: Sequelize.DATE,
        allowNull: true
    },

    // Only the SHA-256 of the reset token is stored, so a leaked database dump
    // cannot be used to reset anyone's password.
    resetTokenHash: {
        type: Sequelize.STRING,
        allowNull: true
    },
    resetTokenExpiresAt: {
        type: Sequelize.DATE,
        allowNull: true
    },

    createdBy: {
        type: Sequelize.UUID,
        allowNull: true
    },
    updatedBy: {
        type: Sequelize.UUID,
        allowNull: true
    }
}, {
    // createdAt / updatedAt are managed by Sequelize.
    timestamps: true,

    // Secrets are never selected unless a controller asks for them by scope,
    // so they cannot leak through code that forgets to strip them.
    defaultScope: {
        attributes: { exclude: ['password', 'resetTokenHash', 'resetTokenExpiresAt'] }
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] }
        },
        withResetToken: {
            attributes: { include: ['resetTokenHash', 'resetTokenExpiresAt'] }
        }
    },

    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
            }
        }
    }
});

User.prototype.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

// Belt and braces: keep secrets out of any JSON response.
User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    delete values.resetTokenHash;
    delete values.resetTokenExpiresAt;
    return values;
};

User.ROLES = ROLES;

exports = module.exports = User;
