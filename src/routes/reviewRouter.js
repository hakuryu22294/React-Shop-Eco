const { Router } = require("express");
const ReviewController = require("../controllers/reviewController");
const { checkLogin } = require("../middlewares/checkPermission");
const reviewRouter = Router();

reviewRouter.post("/:productId", checkLogin, ReviewController.createReview);

module.exports = reviewRouter;
