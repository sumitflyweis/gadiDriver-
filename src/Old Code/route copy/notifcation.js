const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notifcation');

// Route to get all notifications
router.get('/', notificationController.getAllNotifications);

// Route to get a single notification by ID
router.get('/:id', notificationController.getNotificationById);

// Route to create a new notification
router.post('/', notificationController.createNotification);

// Route to update an existing notification by ID
router.put('/:id', notificationController.updateNotificationById);

// Route to delete a notification by ID
router.delete('/:id', notificationController.deleteNotificationById);

module.exports = router;
