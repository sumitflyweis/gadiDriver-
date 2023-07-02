const Language = require("../../model/different_Language");
const axios = require('axios');



// const translateToTelugu = async (text) => {
//   const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
//   const url = 'https://translation.googleapis.com/language/translate/v2';

//   try {
//     const response = await axios.post(url, {
//       q: text,
//       target: 'te', // 'te' is the language code for Telugu
//       key: apiKey,
//     });

//     const translatedText = response.data.data.translations[0].translatedText;
//     return translatedText;
//   } catch (error) {
//     console.error('Translation failed:', error.message);
//     throw new Error('Translation failed');
//   }
// };

// // Example usage
// translateToTelugu('Hello, how are you?')
//   .then((translatedText) => {
//     console.log('Translated Text:', translatedText);
//   })
//   .catch((error) => {
//     console.error('Error:', error.message);
//   });

exports.getLanguages = async (req, res) => {
  try {
    const Languages = await Language.find();
    if (Languages.length == 0) {
      res.status(404).send({ status: 404, message: "Language Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Language found successfully.", data: Languages });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createLanguage = async (req, res) => {
  try {
    let findLanguage = await Language.findOne({ language: req.body.language });
    if (findLanguage) {
      res.status(409).send({ status: 409, message: "Language Already exit", data: {} });
    } else {
      const newLanguage = await Language.create(req.body);
      res.status(200).send({ status: 200, message: "Language Create successfully.", data: newLanguage });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getLanguageById = async (req, res) => {
  try {
    const Languages = await Language.findById(req.params.id);
    if (!Languages) {
      res.status(404).send({ status: 404, message: "Language Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Language found successfully.", data: Languages });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateLanguage = async (req, res) => {
  try {
    const Languages = await Language.findById(req.params.id);
    if (!Languages) {
      res.status(404).send({ status: 404, message: "Language Not found", data: {} });
    } else {
      let obj = {
        language: req.body.language || Languages.language
      }
      const updatedLanguage = await Language.findByIdAndUpdate(location._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "Language Update successfully.", data: updatedLanguage });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteLanguage = async (req, res) => {
  try {
    const deletedLanguage = await Language.findByIdAndDelete(req.params.id);
    if (!deletedLanguage) {
      res.status(404).send({ status: 404, message: "Language Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "Language deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
