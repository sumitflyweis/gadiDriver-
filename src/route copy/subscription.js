const express = require("express");
const router = express.Router();
const subscriptionController = require("../controller/subscription");

// Create a new subscription
router.post("/", subscriptionController.createSubscription);

// Get all subscriptions
router.get("/", subscriptionController.getAllSubscription);

// Get a subscription by ID
router.get("/:id", subscriptionController.getSubscriptionById);

// Update a subscription by ID
router.put("/:id", subscriptionController.updateSubscription);

// Delete a subscription by ID
router.delete("/:id", subscriptionController.deleteSubscription);

router.get("/Subscriptions/:id", subscriptionController.getSubscription)



module.exports = router;
