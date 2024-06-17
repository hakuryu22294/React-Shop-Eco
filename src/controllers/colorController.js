const Color = require("../models/ColorSchema");
const CustomApiError = require("../errors");
const asyncHandler = require("express-async-handler");

class ColorController {
  createColor = asyncHandler(async (req, res) => {
    const { name, hexCode } = req.body;
    const colorExists = await Color.findOne({ name });
    if (colorExists)
      throw CustomApiError.BadRequestError("Color already exists");
    const color = await Color.create({ name, user: req.userAuthId, hexCode });
    res.json({
      status: "success",
      message: "Color created successfully",
      color,
    });
  });

  getColors = asyncHandler(async (req, res) => {
    const colors = await Color.find({});
    res.json({
      status: "success",
      message: "Colors fetched successfully",
      colors,
    });
  });

  getColor = asyncHandler(async (req, res) => {
    const color = await Color.findById(req.params.id);
    res.json({
      status: "success",
      message: "Color fetched successfully",
      color,
    });
  });
  deleteColor = asyncHandler(async (req, res) => {
    const color = await Color.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Color deleted successfully",
      color,
    });
  });
}

module.exports = new ColorController();
