const express = require("express");

const router = express.Router();

// Controllers
const { addUser } = require("../controllers/users");

router
    .route("/login")
    .post((req, res) => {

      res.cookie('user', req.body.user)
  
      res.redirect('/urls')
  });

router
  .route("/registration")
  .get((req, res) => {
    res.render('registration', {
      user : null
    });
});

router
  .route("/registration")
  .post(addUser);

router
  .route("/logout")
  .post((req, res) => {

    res.clearCookie('user');
  
    res.redirect('/registration');
  
  });

module.exports = router;