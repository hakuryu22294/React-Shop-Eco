const mongoose = require("mongoose");

const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumber = Math.floor(1000 + Math.random() * 90000);
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      default: randomTxt + randomNumber,
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "Not Paid",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Not specified",
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    delivereAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
