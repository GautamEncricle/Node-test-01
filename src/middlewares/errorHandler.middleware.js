const AppError = require("../utils/ApiError");

const handleJWTError = (error) =>
  new AppError("Invalid token. Please log in again!", 401);
const handleJWTExpiredError = (error) =>
  new AppError("Your token has expired! Please log in again.", 401);

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (error) => {
  const value = error.errormsg.match(/([" '])(\\?).*?\1/);
  console.log(value);
  const message = `Duplicate fields value : x. Please provide unique value`;
};

const handleValidationDB = (error) => {
  const message = `Invalid app data`;
  return new AppError(message, 400);
};

//production error handler
const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.log("Error 💥" + error);
    res.status(500).json({
      status: "error",
      message: "Something very wrong!",
    });
  }
};

//development error handler
const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

module.exports = (error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    let err = { ...error };
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError(err);
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError(err);
    sendErrorProd(error, res);
  }
};
