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



exports.createLanguage = async (req, res) => {
  try {
    console.log("hi")
    const { language } = req.body;

    const data = await Language.create({ language: language });
    res.status(201).json(data);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create language." });
  }
};




exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.find();

    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve languages." });
  }
};


exports.getLanguageById = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findById(id);

    if (!language) {
      return res.status(404).json({ error: "Language not found." });
    }
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve language." });
  }
};


exports.updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.body;

    const updatedLanguage = await Language.findByIdAndUpdate(
      id,
      { language },
      { new: true }
    );

    if (!updatedLanguage) {
      return res.status(404).json({ error: "Language not found." });
    }

    res.status(200).json(updatedLanguage);
  } catch (error) {
    res.status(500).json({ error: "Failed to update language." });
  }
};

exports.deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLanguage = await Language.findByIdAndDelete(id);

    if (!deletedLanguage) {
      return res.status(404).json({ error: "Language not found." });
    }

    res.status(200).json({ message: "Language deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete language." });
  }
};
