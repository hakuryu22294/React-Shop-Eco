module.exports.categoriesFolder = async (req, res, next) => {
  req.folder = "Fashion-Shop/Category";
  next();
};

module.exports.productsFolder = async (req, res, next) => {
  req.folder = "Fashion-Shop/Product";
  next();
};
