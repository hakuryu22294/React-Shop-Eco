const Category = require("../models/CategorySchema");
const asyncHandler = require("express-async-handler");
const CustomApiError = require("../errors");

class CategoryController {
  createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name });
    if (categoryExists)
      throw CustomApiError.BadRequestError("Category already exists");
    const category = await Category.create({ name, user: req.userAuthId });
    res.json({
      status: "success",
      message: "Category created successfully",
      category,
    });
  });
  getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json({
      status: "success",
      message: "Categories fetched successfully",
      categories,
    });
  });
  getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      message: "Category fetched successfully",
      category,
    });
  });
  updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      message: "Category updated successfully",
      category,
    });
  });
  deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Category deleted successfully",
      category,
    });
  });
}

module.exports = new CategoryController();
