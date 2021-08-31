const express = require("express");

const router = express.Router();

// CUSTOM MIDDLEWARES
const { authUser } = require("../custom_middlewares");

// CONTROLLERS
const { 
  browseURLsByUserIDController,
  readURLController,
  editURLController,
  addURLController,
  deleteURLController,
  renderAddURLPageController,
} = require("../controllers/urls");

router.route("/")
  .get(authUser, browseURLsByUserIDController)
  .post(authUser, addURLController);

router.route("/new")
  .get(authUser, renderAddURLPageController);

router.route("/:key")
  .get(authUser, readURLController)
  .put(authUser, editURLController)
  .delete(authUser, deleteURLController);

module.exports = router;