const Video = require('../../model/video');
exports.getAllVideos = async (req, res) => {
  try {
    const Videos = await Video.find();
    if (Videos.length == 0) {
      res.status(404).send({ status: 404, message: "Video Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Video found successfully.", data: Videos });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createVideo = async (req, res) => {
  try {
    const newVideo = await Video.create(req.body);
    res.status(200).send({ status: 200, message: "Video Create successfully.", data: newVideo });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getVideoById = async (req, res) => {
  try {
    const Videos = await Video.findById(req.params.id);
    if (!Videos) {
      res.status(404).send({ status: 404, message: "Video Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Video found successfully.", data: Videos });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateVideoById = async (req, res) => {
  try {
    const { video, startTime, endTime } = req.body;
    const Videos = await Video.findById(req.params.id);
    if (!Videos) {
      res.status(404).send({ status: 404, message: "Video Not found", data: {} });
    } else {
      let obj = {
        video: video || Videos.video,
        startTime: startTime || Videos.startTime,
        endTime: endTime || Videos.endTime,
      }
      const updatedVideo = await Video.findByIdAndUpdate(Videos._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "Video Update successfully.", data: updatedVideo });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteVideoById = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
      res.status(404).send({ status: 404, message: "Video Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "Video deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
