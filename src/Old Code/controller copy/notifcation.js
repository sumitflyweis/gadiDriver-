const Notification = require('../model/notifcation');

// Controller to create a new notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      message: req.body.message,
      image: req.body.image
    });
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json({msg:notifications});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to get a specific notification by ID
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    res.json({msg:notification});
  } catch (err) {
    res.status(404).json({ message: 'Notification not found' });
  }
};

// Controller to update a specific notification by ID
exports.updateNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        message: req.body.message,
        image: req.body.image
      },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(404).json({ message: 'Notification not found' });
  }
};

// Controller to delete a specific notification by ID
exports.deleteNotificationById = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Notification not found' });
  }
};
