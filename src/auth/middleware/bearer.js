const user = require("../models/user");
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      _authError();
    }

    const token = req.headers.authorization.split(" ").pop();
    const validUser = await user.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    _authError();
  }

  function _authError() {
    next("Invalid Login");
  }
};
