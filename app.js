const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { globalErrorHandler } = require("./src/utils/globalErrorHandler");
const ErrorHandler = require('./src/middlewares/errorHandler.middleware');
require("dotenv").config({ path: "./.env.dev" });

const Node_Env = process.env.NODE_ENV;
if (Node_Env === "production") {
  require("dotenv").config({ path: "./.env.prod" });
}

const app = express();
app.use(express.json());
app.use(cookieParser());

cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
});

//imports routers
const authRouter = require("./src/routes/user.routes");
const blogRouter = require("./src/routes/blog.routes");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);

// app.use(globalErrorHandler);
app.use(ErrorHandler);
module.exports = app;