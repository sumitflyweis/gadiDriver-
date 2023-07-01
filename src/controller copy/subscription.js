const Subscription = require("../model/subscription");

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Get all subscriptions
exports.getAllSubscription = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({msg:subscriptions});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Get a subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found." });
    }
    res.status(200).json({msg:subscription});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Update a subscription by ID
exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found." });
    }
    res.status(200).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Delete a subscription by ID
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found." });
    }
    res.status(200).json({ message: "Subscription deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}



exports.getSubscription = async (req, res) => {
  const subscriptionId = req.params.id;
  const entryDate = new Date();

  try {
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const startDate = new Date(subscription.startDate);
    const endDate = new Date(subscription.endDate);

    if (entryDate < startDate || entryDate > endDate) {
      return res.status(400).json({ message: 'Invalid subscription' });
    }

    const daysLeft = Math.round((endDate - entryDate) / (1000 * 60 * 60 * 24));

    return res.status(200).json({ message: 'Subscription valid', daysLeft });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
