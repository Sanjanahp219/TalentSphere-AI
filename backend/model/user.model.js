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

    // Password is never selected unless the `withPassword` scope is used,
    // so it cannot leak through a controller that forgets to strip it.
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        withPassword: {
            attributes: { include: ['password'] }
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

// Belt and braces: keep the hash out of any JSON response.
User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
};

User.ROLES = ROLES;

exports = module.exports = User;
