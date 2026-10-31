const express = require('express');
const notificationController = require('../controllers/notification.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// All notification actions require user authentication.
router.use(authenticate);

// Maps to GET /api/notifications
router.get('/', notificationController.getNotifications);

// Maps to PUT /api/notifications/read-all
router.put('/read-all', notificationController.markAllAsRead);

// Maps to PUT /api/notifications/:id/read
router.put('/:id/read', notificationController.markAsRead);

exports = module.exports = router;
