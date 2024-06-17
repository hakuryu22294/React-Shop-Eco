const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    rating: {
      type: Number,
      required: [true, "Review must have a rating"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Review must have a comment"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Review", reviewSchema);
