const Sequelize = require('sequelize');
const db = require('../config/db.config');
const User = require('./user.model');

const STATUSES = ['Active', 'On Leave', 'Terminated'];

/**
 * Employee model represents detailed workforce profiles, including job details,
 * department, technical skills list, experience, status, and optional login user mapping.
 */
const Employee = db.define('employee', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
        set(value) {
            this.setDataValue('email', String(value || '').trim().toLowerCase());
        }
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: []
    },
    experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    joinedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.ENUM(...STATUSES),
        allowNull: false,
        defaultValue: 'Active'
    }
}, {
    timestamps: true
});

// Associations
User.hasOne(Employee, { foreignKey: 'userId', as: 'employee', onDelete: 'SET NULL' });
Employee.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Employee.STATUSES = STATUSES;

exports = module.exports = Employee;
