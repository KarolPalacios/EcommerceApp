const ProductsInCartServices = require("../services/productsInCart.services");

const addProduct = async (req, res, next) => {
  try {
    const productInCart = req.body;
    const result = await ProductsInCartServices.addProduct(productInCart);
    if(result) {
      res.status(201).json({message: "product added to cart"});
    } else {
      res.status(400).json({message: "something wrong"});
    };
  } catch (error) {
    next(error);
  }
};

const getAllProductsInCart = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await ProductsInCartServices.allProductsInCart(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addProduct,
  getAllProductsInCart
};