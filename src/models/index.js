const { DataTypes, Sequelize } = require("sequelize");
const todo = require("./todoModel/model");
const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory:";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  sequelize,
  DataTypes,
  Todo: todo(sequelize, DataTypes),
};
