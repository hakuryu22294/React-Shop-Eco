const CustomApiError = require("../errors");
const Product = require("../models/ProductSchema");
const asyncHandler = require("express-async-handler");
const Category = require("../models/CategorySchema");
const Brand = require("../models/BrandSchema");

class ProductController {
  createProduct = asyncHandler(async (req, res) => {
    const {
      name,
      description,
      category,
      brand,
      sizes,
      colors,
      user,
      price,
      totalQty,
    } = req.body;
    const productExists = await Product.findOne({ name });
    if (productExists)
      throw CustomApiError.BadRequestError("Product already exists");
    const categoryFound = await Category.findOne({ name: category });
    if (!categoryFound)
      throw CustomApiError.BadRequestError("Category not found");
    categoryFound.products.push(product._id);
    await categoryFound.save();
    const brandFound = await Brand.findOne({ name: brand });
    if (!brandFound) throw CustomApiError.BadRequestError("Brand not found");
    brandFound.products.push(product._id);
    await brandFound.save();
    const product = await Product.create({
      name,
      description,
      category,
      brand,
      sizes,
      colors,
      user: req.userAuthId,
      price,
      totalQty,
    });
    res.json({
      status: "success",
      message: "Product created successfully",
      product,
    });
  });
  getProducts = asyncHandler(async (req, res) => {
    let productQuery = Product.find({});
    if (req.query.name) {
      productQuery.find({
        name: {
          $regex: req.query.name,
          $options: "i",
        },
      });
    }
    if (req.query.brand) {
      productQuery.find({
        brand: {
          $regex: req.query.name,
          $options: "i",
        },
      });
    }
    if (req.query.category) {
      productQuery.find({
        category: {
          $regex: req.query.name,
          $options: "i",
        },
      });
    }
    if (req.query.color) {
      productQuery.find({
        colors: {
          $regex: req.query.name,
          $options: "i",
        },
      });
    }
    if (req.query.price) {
      const priceRange = req.query.price.split("-");
      productQuery.find({
        price: {
          $gte: priceRange[0],
          $lte: priceRange[1],
        },
      });
    }
    if (req.query.size) {
      productQuery.find({
        sizes: {
          $regex: req.query.name,
          $options: "i",
        },
      });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments({});
    productQuery = productQuery.skip(startIndex).limit(limit);
    const panigationResult = {};
    if (endIndex < total) {
      panigationResult.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      panigationResult.previous = {
        page: page - 1,
        limit,
      };
    }
    const products = await productQuery.populate("reviews");
    res.json({
      status: "success",
      message: "Products fetched successfully",
      total,
      result: products.length,
      products,
    });
  });
  getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) throw CustomApiError.NotFoundError("Product not found");
    res.json({
      status: "success",
      message: "Product fetched successfully",
      product,
    });
  });
  updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      description,
      category,
      sizes,
      brand,
      colors,
      user,
      price,
      totalQty,
    } = req.body;
    const product = await Product.findOneAndUpdate(
      req.params.id,
      {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      message: "Product updated successfully",
      product,
    });
  });
  deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw CustomApiError.NotFoundError("Product not found");
    res.json({
      status: "success",
      message: "Product deleted successfully",
      product,
    });
  });
}

module.exports = new ProductController();
