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
      taxPrice,
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
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Sample Product",
              description: "Product description",
            },
            unit_amount: 10 * 100,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/cancel",
    });
    res.send({ url: session.url });
    //Update the user order
    res.status(StatusCodes.CREATED).json({
      message: "Order created successfully",
      order,
      user,
    });
  });
}

module.exports = new OrderController();
