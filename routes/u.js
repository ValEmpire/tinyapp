const express = require("express");

const router = express.Router();

router.route("/:shortURL")
  .get((req, res) => {

    const { shortURL } = req.params;

    console.log(`shortURL ${shortURL} `);

    const { templateVars } = req;

    const longURL = templateVars.getLongURL(shortURL);

    console.log(`longURL ${longURL}`);

    res.redirect(longURL);
  });

module.exports = router;