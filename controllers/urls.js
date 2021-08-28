const URL = require('../models/URL');
const { generateRandomString, setMessageCookie } = require("../utils");

// 
// Browse Urls and render it to urls_index page
// 
const browseURLs = async (req, res) => {
  const { user } = req;
  let urls = {};

  try{
    urls = await URL.browse()

  }catch(error){
    setMessageCookie(res, 'error', error.message);

  }finally{

    return res.render("urls_index", {
      urls,
      user,
    });
  }
}

const browseURLsByUserID = async (req, res) => {
  const { user } = req;
  let urls = {};

  try{
    urls = await URL.browseURLsByUserID(user.id);

  }catch(error){
    setMessageCookie(res, 'error', error.message);

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
  const { key } = req.params;

  try{

    const url = await URL.read(key);

    return res.render("urls_show", {
      shortURL : key,
      longURL : url.longURL,
      user,
    });

  }catch(error){

    return res.render('404', {
      user,
      error,
      backURL: '/urls'
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
    await URL.edit(key, longURL, user.id);

    setMessageCookie(res, 'success', 'Updated successfully.');

  }catch(error){
    setMessageCookie(res, 'error', error.message.message);

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
  const { user } = req;

  try{
    const randomKey = generateRandomString();

    await URL.add({ key : randomKey, longURL, userID : user.id});

    setMessageCookie(res, 'success', `${randomKey} created successfully.`)

    res.redirect('/urls');

    return;

  }catch(error){
    setMessageCookie(res, 'error', error.message);

    res.redirect('/urls');

    return;

  }
}

// 
// delete url then redirect to urls page
// 
const deleteURL = async (req, res) => {
  const { key } = req.params;
  const { user } = req;

  try{
    await URL.delete(key, user.id);

    setMessageCookie(res, 'success', `${key} deleted successfully`);

  }catch(error){

    setMessageCookie(res, 'error', error.message);

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

  return;

}

module.exports = { 
  browseURLs,
  readURL,
  editURL,
  addURL,
  deleteURL,
  renderAddURLPage,
  browseURLsByUserID
};