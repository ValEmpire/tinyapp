const express = require("express");
const URL = require('../models/URL');

const router = express.Router();

router.route("/:shortURL")
  .get(async (req, res) => {

    try{

      const { shortURL } = req.params;

      const url = await URL.read(shortURL);
  
      return res.redirect(url["longURL"]);
  
    }catch(error){

      return res.render('404', {
        error : `Cannot find redirect url.`,
        backURL : '/login'
      });
    }
  });

module.exports = router;