exports.globalErrorHandler = (err, _, res, next) => {
  console.error(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  res.status(err.statusCode).json({
    statusCode: err.status,
    message: err.message,
  });
};
