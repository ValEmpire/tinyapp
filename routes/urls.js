const express = require("express");

const router = express.Router();

// CUSTOM MIDDLEWARES
const { authUser } = require("../custom_middlewares");

// CONTROLLERS
const { 
  browseURLsByUserID,
  readURL,
  editURL,
  addURL,
  deleteURL,
  renderAddURLPage,
} = require("../controllers/urls");

router.route("/")
  .get(authUser, browseURLsByUserID)
  .post(authUser, addURL);

router.route("/new")
  .get(authUser, renderAddURLPage);

router.route("/:key")
  .post(authUser, editURL)
  .get(authUser, readURL);

router.route("/:key/delete")
  .post(authUser, deleteURL);

module.exports = router;