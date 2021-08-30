const { 
  getURLSByUserID,
  getURLByKey,
  editURLByKey,
  addURL,
  deleteURL,
} = require('../helpers/urls');

const {
  setMessageCookie,
} = require("../utils");

const browseURLsByUserIDController = async (req, res) => {
  const { user } = req;

  const { urls, error } = await getURLSByUserID({ userID : user.id });

  if(error){
    setMessageCookie(res, 'error', error);

    return res.render("urls_index", {
      urls : {},
      user,
    });
  }

  return res.render("urls_index", {
    urls,
    user,
  });
}

// 
// Get a single url with params and render it to urls_show page
// 
const readURLController = async (req, res) => {
  const { user } = req;
  const { key } = req.params;

  const { url, error } = await getURLByKey({ key });

  if(error) {
    return res.render('404', {
      user,
      error,
      backURL: '/urls'
    });
  }

  return res.render("urls_show", {
    shortURL : key,
    longURL : url.longURL,
    user,
  });
}

// 
// update url with params and send success message
// 
const editURLController = async (req, res) => {
  const { user } = req;
  const { key } = req.params;
  const { longURL } = req.body;

  const { error } = await editURLByKey({ key, userID:user.id, longURL });

  if(error){
    setMessageCookie(res, 'error', error);

    return res.render('urls_show', {
      shortURL : key,
      longURL,
      user,
    });
  }

  setMessageCookie(res, 'success', 'Updated successfully.');

  return res.render('urls_show', {
    shortURL : key,
    longURL,
    user,
  });
}

// 
// add new url
// 
const addURLController = async (req, res) => {
  const { longURL } = req.body;
  const { user } = req;

  const { url, error } = await addURL({ longURL, userID : user.id });

  if(error){
    setMessageCookie(res, 'error', error);
    return res.redirect('/urls');
  }

  setMessageCookie(res, 'success', `${url[Object.keys(url)[0]]} created successfully.`)

  return res.redirect('/urls');
}

// 
// delete url then redirect to urls page
// 
const deleteURLController = async (req, res) => {
  const { key } = req.params;
  const { user } = req;

  const { error } = await deleteURL({key, userID : user.id});

  if(error) {
    setMessageCookie(res, 'error', error);
    return res.redirect('/urls');
  }

  setMessageCookie(res, 'success', `${key} deleted successfully`);

  return res.redirect('/urls');
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