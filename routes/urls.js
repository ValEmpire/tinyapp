const express = require("express");

const router = express.Router();

// CUSTOM MIDDLEWARES
const { getUser } = require("../custom_middlewares");

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
  .get(getUser, browseURLsByUserID)
  .post(getUser, addURL);

router.route("/new")
  .get(getUser, renderAddURLPage);

router.route("/:key")
  .post(getUser, editURL)
  .get(getUser, readURL);

router.route("/:key/delete")
  .post(getUser, deleteURL);

module.exports = router;