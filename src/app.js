require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/notFound");
const { connection } = require("./db/conn");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
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
app.use("/api/v1", router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
