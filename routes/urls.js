const express = require("express");

const router = express.Router();

// CUSTOM MIDDLEWARES
const { getUser } = require("../custom_middlewares");

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
  .get(getUser, browseURLs)
  .post(addURL);

router.route("/:key")
  .post(editURL);

router.route("/new")
  .get(getUser, renderAddURLPage);

router.route("/:shortURL")
  .get(getUser, readURL);

router.route("/:key/delete")
  .post(deleteURL);

  


module.exports = router;