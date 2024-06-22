const Order = require("../models/OrderSchema");
const User = require("../models/UserSchema");
const Product = require("../models/ProductSchema");
const CustomApiError = require("../errors");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Stripe = require("stripe");
require("dotenv").config();

//config stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class OrderController {
  createOrder = asyncHandler(async (req, res) => {
    //get the coupon or discount
    const { coupon } = req?.query;

    const couponFound = await Coupon.findOne({ code: coupon?.toUpperCase() });

    if (couponFound?.isExpired)
      throw CustomApiError.BadRequestError("Coupon expired");
    if (!couponFound) throw CustomApiError.NotFoundError("Coupon not found");
    //get disocunt
    const discount = couponFound?.discount / 100;
    //Get the pauload (customer,orderItems, shippingAddress, totalPrice)
    const { orderItems, shippingAddress, taxPrice } = req.body;
    //Find the user
    const user = await User.find(req.userAuthId);
    //Check if user has  shipping address
    if (user?.shippingAddress)
      throw CustomApiError.BadRequestError("Please provide shipping address");
    if (!orderItems || orderItems.length <= 0)
      //Check if order is not empty
      throw CustomApiError.BadRequestError("No order items");
    //Place/create order - save into DB
    const order = await Order.create({
      user: user?._id,
      orderItems,
      shippingAddress,
      taxPrice: couponFound ? taxPrice - taxPrice * discount : taxPrice,
    });
    //update the product qty
    const products = await Product.find({ _id: { $in: orderItems } });
    orderItems?.map(async (order) => {
      const product = products.find(
        (product) => product._id.toString() === order._id.toString()
      );
      if (product) {
        product.totalSold += order.qty;
      }
      await product.save();
    });
    user.orders.push(order._id);
    await user.save();
    //make payment(stripe)
    //convert order items to have same structure  that strip need
    const convertOrders = orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    }));
    const session = await stripe.checkout.sessions.create({
      line_items: convertOrders,
      metadata: {
        orderId: JSON.stringify(order._id),
      },

      mode: "payment",
      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/cancel",
    });
    res.send({ url: session.url });
    //Update the user order
    // res.status(StatusCodes.CREATED).json({
    //   message: "Order created successfully",
    //   order,
    //   user,
    // });
  });

  getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.userAuthId });
    res.status(StatusCodes.OK).json({
      message: "Orders fetched successfully",
      orders,
    });
  });
  getOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    res.status(StatusCodes.OK).json({
      message: "Order fetched successfully",
      order,
    });
  });
  updateOrder = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedOder = await Order.findByIdAndUpdate(
      id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    res.status(StatusCodes.OK).json({
      message: "Order updated successfully",
      updatedOder,
    });
  });
  getSalesSum = asyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$taxPrice",
          },
          minimumSale: {
            $min: "$taxPrice",
          },
          maximumSale: {
            $max: "$taxPrice",
          },
          averageSale: {
            $avg: "$taxPrice",
          },
        },
      },
    ]);
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const salesToday = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: today,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$taxPrice",
          },
        },
      },
    ]);

    res.status(StatusCodes.OK).json({
      message: "Sales fetched successfully",
      orders,
      salesToday,
    });
  });
}

module.exports = new OrderController();
