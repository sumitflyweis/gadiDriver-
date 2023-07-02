const CategoryInterest = require("../../model/categoryInterest");

exports.getAllCategoryInterests = async (req, res) => {
  try {
    const categories = await CategoryInterest.find();
    if (categories.length == 0) {
      res.status(404).send({ status: 404, message: "Category Interest Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Category Interest found successfully.", data: categories });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createCategoryInterest = async (req, res) => {
  try {
    let findCategory = await CategoryInterest.findOne({ category: req.body.category });
    if (findCategory) {
      res.status(409).send({ status: 409, message: "Category Interest Already exit", data: {} });
    } else {
      const newCategory = await CategoryInterest.create(req.body);
      res.status(200).send({ status: 200, message: "Category Interest Create successfully.", data: newCategory });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getCategoryInterestById = async (req, res) => {
  try {
    const category = await CategoryInterest.findById(req.params.id);
    if (!category) {
      res.status(404).send({ status: 404, message: "Category Interest Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Category Interest found successfully.", data: category });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateCategoryInterest = async (req, res) => {
  try {
    const category = await CategoryInterest.findById(req.params.id);
    if (!category) {
      res.status(404).send({ status: 404, message: "Category Interest Not found", data: {} });
    } else {
      let obj = {
        category: req.body.category || category.category
      }
      const updatedCategory = await CategoryInterest.findByIdAndUpdate(category._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "Category Interest found successfully.", data: updatedCategory });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteCategoryInterest = async (req, res) => {
  try {
    const deletedCategory = await CategoryInterest.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      res.status(404).send({ status: 404, message: "Category Interest Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "Category Interest deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
