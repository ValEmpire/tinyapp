const express = require("express");

const router = express.Router();

// CUSTOM MIDDLEWARES
const { getUser } = require("../custom_middlewares");

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
  .get(getUser, browseURLsByUserIDController)
  .post(getUser, addURLController);

router.route("/new")
  .get(getUser, renderAddURLPageController);

router.route("/:key")
  .post(getUser, editURLController)
  .get(getUser, readURLController);

router.route("/:key/delete")
  .post(getUser, deleteURLController);

module.exports = router;