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
    const { url } = await getURLByKey({ key });

    return res.render("urls_show", {
      shortURL : key,
      longURL : url.longURL,
      user,
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
    await editURLByKey({ key, userID:user.id, longURL });

    setMessageCookie(res, 'success', 'Updated successfully.');

    return res.render('urls_show', {
      shortURL : key,
      longURL,
      user,
    });

  }catch(error){
    setMessageCookie(res, 'error', error.message);

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
const addURLController = async (req, res) => {
  const { longURL } = req.body;
  const { user } = req;

  try{
    const { url } = await addURL({ longURL, userID : user.id });

    setMessageCookie(res, 'success', `${url[Object.keys(url)[0]]} created successfully.`)

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

    setMessageCookie(res, 'success', `${key} deleted successfully`);

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