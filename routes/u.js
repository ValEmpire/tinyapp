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

      res.cookie('error', 'Cannot find redirect url.');

      return res.redirect(`/urls/${shortURL}`);
    }
  });

module.exports = router;