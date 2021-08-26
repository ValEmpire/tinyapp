const express = require("express");

const router = express.Router();

router
    .route("/login")
    .post((req, res) => {

      res.cookie('username', req.body.username)
  
      res.redirect('/urls')
  });

router
  .route("/logout")
  .post((req, res) => {

    res.clearCookie('username');
  
    res.redirect('/urls');
  
  });

module.exports = router;