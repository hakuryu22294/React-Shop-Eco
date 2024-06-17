const { Router } = require("express");
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");
const categoryRouter = require("./categoryRouter");
const brandRouter = require("./brandRouter");
const colorRouter = require("./colorRouter");
const reviewRouter = require("./reviewRouter");
const orderRouter = require("./orderRouter,");
const router = Router();
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/brands", brandRouter);
router.use("/colors", colorRouter);
router.use("/reviews", reviewRouter);
router.use("/orders", orderRouter);

module.exports = router;
