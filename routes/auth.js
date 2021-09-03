const express = require("express");

const router = express.Router();

// Controllers
const {
  addUserController,
  readUserController,
  renderLoginPageController,
  renderRegistrationPageController,
  logoutController,
} = require("../controllers/users");

router
  .route("/registration")
  .get(renderRegistrationPageController)
  .post(addUserController);

router.route("/login").get(renderLoginPageController).post(readUserController);

router.route("/logout").post(logoutController);

module.exports = router;
