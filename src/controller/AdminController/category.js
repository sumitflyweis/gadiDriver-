const Category = require("../../model/category");

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length == 0) {
      res.status(404).send({ status: 404, message: "Category Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Category found successfully.", data: categories });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createCategory = async (req, res) => {
  try {
    let findCategory = await Category.findOne({ category: req.body.category });
    if (findCategory) {
      res.status(409).send({ status: 409, message: "Category Already exit", data: {} });
    } else {
      const newCategory = await Category.create(req.body);
      res.status(200).send({ status: 200, message: "Category Create successfully.", data: newCategory });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).send({ status: 404, message: "Category Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "Category found successfully.", data: category });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).send({ status: 404, message: "Category Not found", data: {} });
    } else {
      let obj = {
        category: req.body.category || category.category
      }
      const updatedCategory = await Category.findByIdAndUpdate(category._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "Category found successfully.", data: updatedCategory });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      res.status(404).send({ status: 404, message: "Category Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "Category deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
