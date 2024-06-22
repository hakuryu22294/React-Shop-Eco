require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/notFound");
const { connection } = require("./db/conn");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const Stripe = require("stripe");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const router = require("./routes");

//express
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
// db connection
const URI = process.env.MONGO_URI.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);
connection(URI);
//Routes
app.use("/api/v1", router);

//Stripe webhook
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_END_POINT;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      //update the orders
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      // console.log({
      //   orderId,
      //   paymentStatus,
      //   paymentMethod,
      //   totalAmount,
      //   currency,
      // });
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentStatus,
          paymentMethod,
        },
        {
          new: true,
        }
      );
    } else {
      return;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
