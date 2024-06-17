const Review = require("../models/ReviewSchema");
const CustomApiError = require("../errors");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductSchema");
const { StatusCodes } = require("http-status-codes");
class ReviewController {
  createReview = asyncHandler(async (req, res) => {
    const { product, rating, comment } = req.body;
    const { productId } = req.params;
    const productFound = await Product.findById(productId);
    if (!productFound) throw CustomApiError.NotFoundError("Product not found");
    const hasReviewed = await productFound?.reviews?.find(
      (review) => review?.user?.toString() === req.userAuthId
    );
    const review = await Review.create({
      user: req.userAuthId,
      product: productFound?._id,
      rating,
      comment,
    });
    productFound.reviews.push(review?._id);
    await productFound.save();
    res.status(StatusCodes.CREATED).json({
      message: "Review created successfully",
      review,
    });
  });
}

module.exports = new ReviewController();
