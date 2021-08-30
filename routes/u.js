const express = require("express");

const router = express.Router();

const { URLRedirect } = require('../controllers/u');

router.route("/:shortURL")
  .get(URLRedirect);

module.exports = router;