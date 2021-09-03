const { 
  getURLSByUserID,
  getURLByKey,
  editURL,
  addURL,
  deleteURL,
} = require('../helpers/urls');

const {
  initUrlVisitor,
  getURLVisitorsByURLKey,
} = require('../helpers/urlVisitors');

const {
  setMessageCookie,
  generateRandomString,
} = require("../utils");

const browseURLsByUserIDController = async (req, res) => {
  const { user } = req;

  try{
    const { urls } = await getURLSByUserID({ userID : user.id });

    return res.render("urls_index", {
      urls,
      user,
    });

  }catch(error){
    setMessageCookie(res, 'error', error.message);

    return res.render("urls_index", {
      urls : {},
      user,
    });
  }
}

// 
// Get a single url with params and render it to urls_show page
// 
const readURLController = async (req, res) => {
  const { user } = req;
  const { key } = req.params;

  try{
    const { url } = await getURLByKey({ key, userID : user.id });

    const longURL = url[Object.keys(url)[0]].longURL;

    const { urlVisitors } = await getURLVisitorsByURLKey({ urlKey : key });

    return res.render("urls_show", {
      shortURL : key,
      longURL,
      user,
      urlVisitors,
      hostName: process.env.HOSTNAME || 'http://localhost:8080/u/'
    });

  }catch(error){
    return res.render('404', {
      user,
      error: error.message,
      backURL: '/urls'
    });
  }
}

// 
// update url with params and send success message
// 
const editURLController = async (req, res) => {
  const { user } = req;
  const { key } = req.params;
  const { longURL } = req.body;

  try{
    await editURL({ key, userID:user.id, longURL });

    setMessageCookie(res, 'success', 'Updated successfully.');

    return res.redirect('/urls');

  }catch(error){
    setMessageCookie(res, 'error', error.message);

    return res.redirect('/urls');
  }
}

// 
// add new url
// 
const addURLController = async (req, res) => {
  const { longURL } = req.body;
  const { user } = req;

  try{

    const urlKey = generateRandomString();

    const urlVisitorKey = generateRandomString();

    await addURL({
      key : urlKey,
      longURL,
      userID : user.id
    });

    // after we add new redirect url we will init urlvisitors
    // this will add new key with initial value 
    await initUrlVisitor({
      key : urlVisitorKey,
      urlKey
    });

    setMessageCookie(res, 'success', `New URL has been created successfully.`);

    return res.redirect('/urls');

  }catch(error){
    setMessageCookie(res, 'error', error.message);
    return res.redirect('/urls');
  }
}

// 
// delete url then redirect to urls page
// 
const deleteURLController = async (req, res) => {
  const { key } = req.params;
  const { user } = req;

  try{
    await deleteURL({key, userID : user.id});

    setMessageCookie(res, 'success', `URL with ${key} has been deleted successfully.`);

    return res.redirect('/urls');

  }catch(error){
    setMessageCookie(res, 'error', error.message);
    return res.redirect('/urls');
  }
}

// 
// render the page to create new url
// 
const renderAddURLPageController = (req, res) => {

  const { user } = req;

  return res.render("urls_new", {
    user,
  });
}

module.exports = { 
  readURLController,
  editURLController,
  addURLController,
  deleteURLController,
  renderAddURLPageController,
  browseURLsByUserIDController
};