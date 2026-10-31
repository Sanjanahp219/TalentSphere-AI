const Sequelize = require('sequelize');
const db = require('../config/db.config');
const User = require('./user.model');

/**
 * Notification model represents the database table for user notifications.
 * It tracks unread status, the message body text, and links back to the recipient user.
 */
const Notification = db.define('notification', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    unread: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Set up relationship: One User has many Notifications.
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

exports = module.exports = Notification;
