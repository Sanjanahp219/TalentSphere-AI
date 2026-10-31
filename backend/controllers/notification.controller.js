const Notification = require('../model/notification.model');

/**
 * GET /api/notifications
 * Retrieves all notifications for the currently logged-in user.
 * If the user has no notifications yet, this will auto-generate
 * three welcome/demo notifications for ease of testing.
 */
const getNotifications = async (req, res, next) => {
    try {
        let notifications = await Notification.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        // Auto-seed three demo notifications if the user is new/has none
        if (notifications.length === 0) {
            await Notification.bulkCreate([
                { 
                    userId: req.user.id, 
                    text: "Welcome to TalentSphere AI! Explore your dashboard to get started.", 
                    unread: true 
                },
                { 
                    userId: req.user.id, 
                    text: "Your profile is 80% complete. Add your skills to get better job matches.", 
                    unread: true 
                },
                { 
                    userId: req.user.id, 
                    text: "AI recommendation engine has updated matches for your skills.", 
                    unread: false 
                }
            ]);

            // Re-fetch notifications after creation
            notifications = await Notification.findAll({
                where: { userId: req.user.id },
                order: [['createdAt', 'DESC']]
            });
        }

        return res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * PUT /api/notifications/read-all
 * Marks all notifications for the currently logged-in user as read.
 */
const markAllAsRead = async (req, res, next) => {
    try {
        await Notification.update(
            { unread: false },
            { where: { userId: req.user.id } }
        );

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read"
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * PUT /api/notifications/:id/read
 * Marks a single notification (identified by ID) as read.
 * Checks that the notification belongs to the logged-in user.
 */
const markAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findOne({
            where: { id, userId: req.user.id }
        });

        if (!notification) {
            return res.status(404).json({ 
                success: false, 
                message: "Notification not found" 
            });
        }

        notification.unread = false;
        await notification.save();

        return res.status(200).json({
            success: true,
            data: notification
        });
    } catch (error) {
        return next(error);
    }
};

exports = module.exports = {
    getNotifications,
    markAllAsRead,
    markAsRead
};
