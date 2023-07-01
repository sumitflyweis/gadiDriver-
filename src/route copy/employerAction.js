const express = require("express");
const router = express.Router();

const employerActionController = require("../controller/employerAction");

// GET /api/employer-action
router.get("/", employerActionController.getEmployerAction);

// GET /api/employer-action/:id
router.get("/:id", employerActionController.getEmployerActionById);

// POST /api/employer-action
router.post("/", employerActionController.createEmployerAction);

// PUT /api/employer-action/:id
router.put("/:id", employerActionController.updateEmployerAction);

// DELETE /api/employer-action/:id
router.delete("/:id", employerActionController.deleteEmployerAction);

module.exports = router;
