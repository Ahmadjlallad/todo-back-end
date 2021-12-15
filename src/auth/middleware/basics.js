const base64 = require("base-64");
const userModule = require("../models/user");
module.exports = async function basic(req, res, next) {
  if (!req.headers.authorization) next(new Error("No authorization header"));
  const auth64 = req.headers.authorization.split(" ").pop();
  console.log("auth64", auth64);
  const [user, pass] = base64.decode(auth64).split(":");
  console.log("user, pass", user, pass);
  try {
    req.body.user = await userModule.authenticateBasic(user, pass);
    next();
  } catch (err) {
    next(err);
  }
};
