module.exports = function (req, res, next) {
  // Logging the request
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};
