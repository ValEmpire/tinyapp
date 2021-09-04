const {
  getUserCookie,
  setMessageCookie,
  clearUserCookie,
} = require("../utils");
const { User } = require("../models/User");

// we will call this in all protected routes
// will set error message if user cookie is not found and validated
// then redirect to /login
const authUser = async (req, res, next) => {
  try {
    // get userCookie
    const userID = getUserCookie(req);

    // if userID is not found in cookie
    if (!userID) {
      throw new Error("Only login users can access protected route.");
    }

    // check if userID exists in users
    const user = await User.readById(userID);

    // throw if not found
    if (!user) throw new Error("Invalid or expired cookie.");

    req["user"] = user;

    next();
  } catch (error) {
    setMessageCookie(res, "error", error.message);

    // clear cookie as it is not valid
    clearUserCookie(req);

    res.redirect("/login");

    return;
  }
};

module.exports = {
  authUser,
};
