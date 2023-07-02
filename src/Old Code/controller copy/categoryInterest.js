const CategoryInterest = require("../model/categoryInterest");

// Controller for creating a new category interest
exports.createCategoryInterest = async (req, res) => {
  try {
    const categoryData = req.body;
    const categoryInterest = await CategoryInterest.create(categoryData);
    return res.status(201).json(categoryInterest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting all category interests
exports.getAllCategoryInterests = async (req, res) => {
  try {
    const categoryInterests = await CategoryInterest.find().exec();
    return res.json(categoryInterests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting a category interest by ID
exports.getCategoryInterestById = async (req, res) => {
  try {
    const categoryInterestId = req.params.id;
    const categoryInterest = await CategoryInterest.findById(
      categoryInterestId
    ).exec();

    if (!categoryInterest) {
      return res.status(404).json({ error: "Category Interest not found" });
    }

    return res.json(categoryInterest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for updating a category interest by ID
exports.updateCategoryInterest = async (req, res) => {
  try {
    const categoryInterestId = req.params.id;
    const updateData = req.body;

    const categoryInterest = await CategoryInterest.findByIdAndUpdate(
      categoryInterestId,
      updateData,
      { new: true }
    ).exec();

    if (!categoryInterest) {
      return res.status(404).json({ error: "Category Interest not found" });
    }

    return res.json(categoryInterest);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for deleting a category interest by ID
exports.deleteCategoryInterest = async (req, res) => {
  try {
    const categoryInterestId = req.params.id;
    const categoryInterest = await CategoryInterest.findByIdAndDelete(
      categoryInterestId
    ).exec();

    if (!categoryInterest) {
      return res.status(404).json({ error: "Category Interest not found" });
    }

    return res.json({ message: "Category Interest deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

