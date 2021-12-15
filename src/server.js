const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const todoRouter = require("./routes/todoRouts");
const userRouts = require("./routes/userRouts");
app.use(logger);
app.use("/todo", todoRouter);
app.use("/", userRouts);
app.use("*", notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: function (port) {
    app.listen(port, () => {
      console.log("Server started on port " + port);
    });
  },
};
