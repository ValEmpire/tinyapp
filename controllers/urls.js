const URL = require('../models/URL');
const { generateRandomString } = require("../utils");

// 
// Browse Urls and render it to urls_index page
// 
const browseURLs = async (req, res) => {
  const { user } = req;
  let urls = {};

  try{
    urls = await URL.browse()

  }catch(error){

    console.log(error)
    res.cookie('error', error);

  }finally{
    return res.render("urls_index", {
      urls,
      user,
    });
  }
}

// 
// Get a single url with params and render it to urls_show page
// 
const readURL = async (req, res) => {
  const { user } = req;

  try{
    const { shortURL } = req.params;

    const longURL = await URL.read(shortURL);

    return res.render("urls_show", {
      shortURL,
      longURL,
      user,
    });

  }catch(error){
    return res.render('404', {
      user,
      error,
    });
  }
}

// 
// update url with params and send success message
// 
const editURL = async (req, res) => {
  const { user } = req;
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
      user,
    });
  }
}

// 
// add new url
// 
const addURL = async (req, res) => {
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

  const { user } = req;

  res.render("urls_new", {
    user,
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