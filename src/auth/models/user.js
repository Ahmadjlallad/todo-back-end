const jwt = require("jsonwebtoken");
const { sequelize, DataTypes } = require("../../models/index");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userModule = sequelize.define("user", {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  token: {
    type: DataTypes.VIRTUAL,
    set(value) {
      return jwt.sign(value, process.env.JWT_SECRET);
    },
    get() {
      return jwt.sign({ username: this.username }, process.env.JWT_SECRET);
    },
  },
  role: {
    type: DataTypes.ENUM("user", "writer", "editor", "admin"),
    required: true,
    defaultValue: "user",
  },
  capabilities: {
    type: DataTypes.VIRTUAL,
    get() {
      const acl = {
        admin: ["read", "create", "update", "delete"],
        writer: ["read", "create"],
        editor: ["read", "update"],
        user: ["read"],
      };
      return acl[this.role];
    },
  },
});
userModule.getUser = async (username) => {
  try {
    await userModule.findOne({ where: { username } });
  } catch (e) {
    throw new Error(e);
  }
};
userModule.createUser = async ({ username, password, email, role }) => {
  try {
    console.log(userModule);
    return await userModule.create({ username, password, email, role });
  } catch (e) {
    console.log(e);
    return e;
  }
};
userModule.updateUser = async ({ username, password, email, role }) =>
  await userModule.update(
    { username, password, email, role },
    { where: { username } }
  );
userModule.removerUser = async (username) =>
  await userModule.destroy({ where: { username } });
userModule.beforeCreate(async (user) => {
  let hashedPass = await bcrypt.hash(user.password, 10);
  user.password = hashedPass;
});
userModule.authenticateBasic = async function (username, password) {
  const user = await userModule.findOne({ where: { username } });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    return user;
  }
  throw new Error("Invalid User " + username);
};
userModule.authenticateToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModule.findOne({
      where: { username: parsedToken.username },
    });
    if (user) {
      return user;
    }
    throw new Error("User Not Found");
  } catch (e) {
    return new Error(e.message);
  }
};
module.exports = userModule;
