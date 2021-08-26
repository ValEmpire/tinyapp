const express = require("express");

const router = express.Router();

router
    .route("/:shortURL")
    .get((req, res) => {

      const { shortURL } = req.params;
    
      const longURL = urlDatabase[shortURL]
      
      res.redirect(longURL);
    });

module.exports = router;