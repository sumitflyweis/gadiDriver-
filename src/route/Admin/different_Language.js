const express = require("express");
const router = express.Router();
const languageController = require("../../controller/AdminController/different_Language");

router.post("/", languageController.createLanguage);
router.get("/", languageController.getLanguages);
router.get("/:id", languageController.getLanguageById);
router.put("/:id", languageController.updateLanguage);
router.delete("/:id", languageController.deleteLanguage);

module.exports = router;
