const authRoutes = require("./auth.routes");
const productsRoutes = require("./products.routes");
const productInCartRoutes = require("./productsInCart.routes");
const orderRoutes = require("./order.routes");

const routerApi = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/products", productsRoutes);
  app.use("/api/v1/cart/", productInCartRoutes);
  app.use("/api/v1/order", orderRoutes);
};

module.exports = routerApi;