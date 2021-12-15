const { sequelize } = require("./src/models/index");
const { start } = require("./src/server");
require("dotenv").config();
sequelize.sync().then(() => {
  console.log("Database has been synced");
  start(process.env.PORT || 3001);
});
