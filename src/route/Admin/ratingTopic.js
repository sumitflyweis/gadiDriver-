const express = require("express");
const router = express.Router();
const jobTypeController = require("../../controller/AdminController/ratingTopic");

router.get("/", jobTypeController.getRatingTopic);
router.post("/", jobTypeController.createRatingTopic);
router.get("/:id", jobTypeController.getRatingTopicById);
router.put("/:id", jobTypeController.updateRatingTopic);
router.delete("/:id", jobTypeController.createRatingTopic);
module.exports = router;