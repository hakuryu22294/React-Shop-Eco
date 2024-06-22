const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//coupon is expired
couponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
});

couponSchema.virtual("daysLeft").get(function () {
  const daysLeft =
    Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24)) +
    " days left";
  return daysLeft;
});

//validations
couponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate)
    next(new Error("End date must be greater than start date"));
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.discount < 0 || this.discount > 100)
    next(new Error("Discount must be between 0 and 100"));
  next();
});

couponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate)
    next(new Error("End date must be greater than start date"));
  next();
});

module.exports = mongoose.model("Coupon", couponSchema);
