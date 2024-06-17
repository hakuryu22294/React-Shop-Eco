const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: 0,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    brand: {
      type: String,
      required: [true, "Please add a brand"],
    },
    category: {
      type: String,
      ref: "Category",
      required: [true, "Please add a category"],
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: [true, "Please add a size"],
    },
    colors: {
      type: [String],
      required: [true, "Please add a color"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add a user"],
    },
    images: {
      type: [String],
      default: ["https://cdn-icons-png.flaticon.com/512/149/149071.png"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    totalQty: {
      type: Number,
      default: 1,
      required: [true, "Please add a total qty"],
    },
    totalSold: {
      type: Number,
      default: 0,
      required: [true, "Please add a total sold"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
productSchema.virtual("averageRating").get(function () {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);
    return Number(totalRating / this.reviews.length).toFixed(1);
  }
  return 0;
});

//qty left
productSchema.virtual("qtyLeft").get(function () {
  const product = this;
  return product.totalQty - product.totalSold;
});

module.exports = mongoose.model("Product", productSchema);
