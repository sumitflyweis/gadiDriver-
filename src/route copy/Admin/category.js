const express = require("express");
const router = express.Router();
const categoryController = require("../../controller/AdminController/category");


router.post("/", categoryController.createCategory);

router.get("/", categoryController.getCategory);
// Get category by ID
router.get("/:id", categoryController.getCategoryById);

// Update category
router.put("/:id", categoryController.updateCategory);

// Delete category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
