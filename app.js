const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { globalErrorHandler } = require("./utils/globalErrorHandler");
require("dotenv").config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());

cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
});

//imports routers
const authRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);

app.use(globalErrorHandler);
module.exports = app;
