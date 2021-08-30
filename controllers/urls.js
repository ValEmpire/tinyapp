const { 
  browseURLsByUserIDHelper,
  readURLHelper,
  editURLHelper,
  addURLHelper,
  deleteURLHelper,
} = require('../helpers/urls');

const {
  setMessageCookie,
} = require("../utils");

const browseURLsByUserID = async (req, res) => {
  const { user } = req;

  const { urls, error } = await browseURLsByUserIDHelper({ userID : user.id });

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
const readURL = async (req, res) => {
  const { user } = req;
  const { key } = req.params;

  const { url, error } = await readURLHelper({ key });

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
const editURL = async (req, res) => {
  const { user } = req;
  const { key } = req.params;
  const { longURL } = req.body;

  const { error } = await editURLHelper({ key, userID:user.id, longURL });

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
const addURL = async (req, res) => {
  const { longURL } = req.body;
  const { user } = req;

  const { url, error } = await addURLHelper({ longURL, userID : user.id });

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
const deleteURL = async (req, res) => {
  const { key } = req.params;
  const { user } = req;

  const { error } = await deleteURLHelper({key, userID : user.id});

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
const renderAddURLPage = (req, res) => {

  const { user } = req;

  return res.render("urls_new", {
    user,
  });
}

module.exports = { 
  readURL,
  editURL,
  addURL,
  deleteURL,
  renderAddURLPage,
  browseURLsByUserID
};