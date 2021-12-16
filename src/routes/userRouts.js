const express = require("express");
const basics = require("../auth/middleware/basics");
const userModule = require("../auth/models/user");
const userRouts = express.Router();
userRouts.post("/sign-in", basics, (req, res, next) => {
  try {
    const { user } = req.body;
    res.json({
      username: user.username,
      email: user.email,
      token: user.token,
      capabilities: user.capabilities,
    });
  } catch (error) {
    next(new Error(JSON.stringify(error)))
  }
});

userRouts.post("/sign-up", async (req, res, next) => {
  try {
    const user = await userModule.createUser(req.body);
    console.log(req.body);
    console.log(user);
    res.status(201).json(user);
  } catch (e) {
    console.log(e);
    next(new Error(JSON.stringify(e)))
  }
});
module.exports = userRouts;
