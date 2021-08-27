const express = require("express");

const router = express.Router();

// CUSTOM MIDDLEWARES
const { getUsername } = require("../custom_middlewares");

// CONTROLLERS
const { 
  browseURLs,
  readURL,
  editURL,
  addURL,
  deleteURL,
  renderAddURLPage,
} = require("../controllers/urls");

router.route("/")
  .get(getUsername, browseURLs)
  .post(addURL);

router.route("/:key")
  .post(editURL);

router.route("/new")
  .get(getUsername, renderAddURLPage);

router.route("/:shortURL")
  .get(getUsername, readURL);

router.route("/:key/delete")
  .post(deleteURL);

  


module.exports = router;