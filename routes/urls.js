const express = require("express");

const router = express.Router();

// CUSTOM MIDDLEWARES
const { getUsername } = require("../custom_middlewares");

// CONTROLLERS
const { 
  getUrls,
  getNewUrl,
  addUrl,
  updateUrl,
  getUrl,
  deleteUrl
} = require("../controllers/urls");

router.route("/")
  .get(getUsername, getUrls)
  .post(addUrl);

router.route("/urls/:id")
  .post(updateUrl);

router.route("/new")
  .get(getUsername, getNewUrl);

router.route("/:shortURL")
  .get(getUsername, getUrl);

router.route("/:key/delete")
  .post(deleteUrl);

  


module.exports = router;