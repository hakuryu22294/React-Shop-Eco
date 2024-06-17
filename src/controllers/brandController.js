const asyncHandler = require("express-async-handler");
const Brand = require("../models/BrandSchema");
const CustomApiError = require("../errors");

class BrandController {
  createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const brandExists = await Brand.findOne({ name });
    if (brandExists)
      throw CustomApiError.BadRequestError("Brand already exists");
    const brand = await Brand.create({ name, user: req.userAuthId });
    res.json({
      status: "success",
      message: "Brand created successfully",
      brand,
    });
  });

  getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    res.json({
      status: "success",
      message: "Brands fetched successfully",
      brands,
    });
  });

  getBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    res.json({
      status: "success",
      message: "Brand fetched successfully",
    });
  });

  updateBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      message: "Brand updated successfully",
      brand,
    });
  });

  deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Brand deleted successfully",
      brand,
    });
  });
}

module.exports = new BrandController();
