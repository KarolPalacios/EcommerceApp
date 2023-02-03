const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: [
    "./src/routes/auth.routes.js",
    "./src/models/users.js",
    "./src/routes/products.routes.js",
    "./src/models/products.js",
    "./src/routes/productsInCart.routes.js",
    "./src/models/products_in_cart.js",
    "./src/routes/order.routes.js",
  ],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce",
      version: "0.0.9",
      description: "API for Ecommerce application"
    }
  }
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader({ "Content-Type": "application/json" });
    res.send(swaggerSpec);
  });
  console.log(`La documentacion esta disponible en ${process.env.URL}:${port}/api/v1/docs`);
};


module.exports = {swaggerDocs};