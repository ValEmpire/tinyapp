const URL = require('../models/URL');
const { generateRandomString } = require("../utils");

// 
// Browse Urls and render it to urls_index page
// 
const browseURLs = async (req, res) => {
  const { username } = req;
  let urls = {};

  try{
    urls = await URL.browse()

  }catch(error){

    console.log(error)
    res.cookie('error', error);

  }finally{
    return res.render("urls_index", {
      urls,
      username,
    });
  }
}

// 
// Get a single url with params and render it to urls_show page
// 
const readURL = async (req, res) => {
  const { username } = req;

  try{
    const { shortURL } = req.params;

    const longURL = await URL.read(shortURL);

    return res.render("urls_show", {
      shortURL,
      longURL,
      username,
    });

  }catch(error){
    return res.render('404', {
      username,
      error,
    });
  }
}

// 
// update url with params and send success message
// 
const editURL = async (req, res) => {
  const { username } = req;
  const { key } = req.params;
  const { longURL } = req.body;

  try{
    await URL.edit(key, longURL);
    res.cookie('success', 'Updated successfully.')

  }catch(error){
    res.cookie('error', error);

  }finally{
    return res.render('urls_show', {
      shortURL : key,
      longURL,
      username,
    });
  }
}

// 
// add new url
// 
const addURL = async (req, res) => {
  const { username } = req;
  const { longURL } = req.body;

  try{
    const randomKey = generateRandomString();

    const newURL = new URL(randomKey, longURL);

    await newURL.add();

    res.cookie('success', `${randomKey} added successfully.`)

  }catch(error){
    res.cookie('error', error);

  }finally{
    return res.redirect('/urls');
  }
}

// 
// delete url then redirect to urls page
// 
const deleteURL = async (req, res) => {
  const { key } = req.params;

  try{
    await URL.delete(key);

    res.cookie('success', `${key} has been deleted.`)

  }catch(error){
    res.cookie('error', error)

  }finally{
    return res.redirect('/urls');
  }
}

// 
// render the page to create new url
// 
const renderAddURLPage = (req, res) => {

  const { username } = req;

  res.render("urls_new", {
    username,
  });

}

module.exports = { 
  browseURLs,
  readURL,
  editURL,
  addURL,
  deleteURL,
  renderAddURLPage,
};