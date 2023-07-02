const express = require("express");
const router = express.Router();
const languageController = require("../../controller/AdminController/different_Language");

// Create a new language
router.post("/", languageController.createLanguage);

// Get all languages
router.get("/", languageController.getLanguages);

// Get a language by ID
router.get("/:id", languageController.getLanguageById);

// Update a language by ID
router.put("/:id", languageController.updateLanguage);

// Delete a language by ID
router.delete("/:id", languageController.deleteLanguage);

module.exports = router;
