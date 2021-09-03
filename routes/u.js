const express = require("express");

const router = express.Router();

const { URLRedirectController } = require("../controllers/u");

router.route("/:shortURL").get(URLRedirectController);

module.exports = router;
