const Video = require('../model/vedio');

// Create a video
exports.createVideo = async (req, res) => {
  try {
    const { vedio, startTime, endTime } = req.body;
    const newVideo = new Video({ vedio, startTime, endTime });
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create video', error });
  }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({msg:videos});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch videos', error });
  }
};

// Get video by ID
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({msg:video});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch video', error });
  }
};

// Update video by ID
exports.updateVideoById = async (req, res) => {
  try {
    const { vedio, startTime, endTime } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { vedio, startTime, endTime },
      { new: true }
    );
    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update video', error });
  }
};

// Delete video by ID
exports.deleteVideoById = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete video', error });
  }
};
