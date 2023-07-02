const Subscription = require("../../model/subscription");

exports.getAllSubscription = async (req, res) => {
  try {
    const findSubscription = await Subscription.find();
    if (findSubscription.length == 0) {
      res.status(404).send({ status: 404, message: "Subscription Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Subscription found successfully.", data: findSubscription });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createSubscription = async (req, res) => {
  try {
    let findSubscription = await Subscription.findOne({ plan: req.body.plan });
    if (findSubscription) {
      res.status(409).send({ status: 409, message: "Subscription Already exit", data: {} });
    } else {
      const newCategory = await Subscription.create(req.body);
      res.status(200).send({ status: 200, message: "Subscription Create successfully.", data: newCategory });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getSubscriptionById = async (req, res) => {
  try {
    const findSubscription = await Subscription.findById(req.params.id);
    if (!findSubscription) {
      res.status(404).send({ status: 404, message: "Subscription Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Subscription found successfully.", data: findSubscription });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateSubscription = async (req, res) => {
  try {
    const findSubscription = await Subscription.findById(req.params.id);
    if (!findSubscription) {
      res.status(404).send({ status: 404, message: "Subscription Not found", data: {} });
    } else {
      let obj = {
        plan: req.body.plan || findSubscription.plan,
        price: req.body.price || findSubscription.price,
        day: req.body.day || findSubscription.day,
        jobPosting: req.body.jobPosting || findSubscription.jobPosting,
        jobDisplay: req.body.jobDisplay || findSubscription.jobDisplay,
        details: req.body.details || findSubscription.details
      }
      const updatedCategory = await Subscription.findByIdAndUpdate(findSubscription._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "Subscription found successfully.", data: updatedCategory });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteSubscription = async (req, res) => {
  try {
    const findSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!findSubscription) {
      res.status(404).send({ status: 404, message: "Subscription Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "Subscription deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
