const ProductServices = require("../services/products.services");

const getAllProducts = async (req, res, next) => {
  try {
    const result = await ProductServices.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createProducts = async (req, res, next) => {
  try {
    const product = req.body;
    const result = await ProductServices.create(product);
    if (result) {
      next({ message: "product created" });
    } else {
      next({ message: "something wrong" });
    };
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts,
  createProducts
};