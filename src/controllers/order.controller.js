const OrderServices = require("../services/order.services");

const createOrder = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await OrderServices.createOrder(id);
    if (result) {
      res.status(201).json({message: "order created"});
    } else {
      res.status(400).json({message: "something wrong"});
    }
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await OrderServices.allOrders(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders
};