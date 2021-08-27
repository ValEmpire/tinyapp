const express = require("express");

const router = express.Router();

const { getUser } = require("../custom_middlewares");

// Controllers
const {
  addUser,
  readUser,
  renderLoginPage,
  renderRegistrationPage,
  logout,
} = require("../controllers/users");

router
    .route("/login")
    .get(getUser, renderLoginPage)
    .post(readUser);

router
  .route("/registration")
  .get(getUser, renderRegistrationPage)
  .post(addUser);


router
  .route("/logout")
  .post(logout);

module.exports = router;