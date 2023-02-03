const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const error = require("./middlewares/error.middleware");
const routerApi = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
routerApi(app);
app.use(error);

module.exports = app;