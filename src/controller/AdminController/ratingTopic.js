const ratingTopic = require("../../model/ratingTopic");
exports.getRatingTopic = async (req, res) => {
  try {
    const RatingTopic = await ratingTopic.find();
    if (RatingTopic.length == 0) {
      res.status(404).send({ status: 404, message: "RatingTopic Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "RatingTopic found successfully.", data: RatingTopic });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createRatingTopic = async (req, res) => {
  try {
    let findRatingTopic = await ratingTopic.findOne({ topic: req.body.topic });
    if (findRatingTopic) {
      res.status(409).send({ status: 409, message: "RatingTopic Already exit", data: {} });
    } else {
      const newRatingTopic = await ratingTopic.create(req.body);
      res.status(200).send({ status: 200, message: "RatingTopic Create successfully.", data: newRatingTopic });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getRatingTopicById = async (req, res) => {
  try {
    const newRatingTopic = await ratingTopic.findById(req.params.id);
    if (!newRatingTopic) {
      res.status(404).send({ status: 404, message: "RatingTopic Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "RatingTopic found successfully.", data: newRatingTopic });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateRatingTopic = async (req, res) => {
  try {
    const newRatingTopic = await ratingTopic.findById(req.params.id);
    if (!newRatingTopic) {
      res.status(404).send({ status: 404, message: "RatingTopic Not found", data: {} });
    } else {
      let obj = {
        topic: req.body.topic || newRatingTopic.topic
      }
      const updatedRatingTopic = await ratingTopic.findByIdAndUpdate(newRatingTopic._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "RatingTopic Update successfully.", data: updatedRatingTopic });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteRatingTopic = async (req, res) => {
  try {
    const deletedRatingTopic = await ratingTopic.findByIdAndDelete(req.params.id);
    if (!deletedRatingTopic) {
      res.status(404).send({ status: 404, message: "RatingTopic Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "RatingTopic deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
