const { generateRandomString } = require("../utils");

// 
// Get all Url and render it to urls_index page
// 
const getUrls = (req, res) => {

  const { templateVars } = req;

  res.render("urls_index", templateVars);
}

// 
// Ge a single url with params and render it to urls_show page
// 
const getUrl = (req, res) => {

  const { shortURL } = req.params;

  const { templateVars } = req;

  const url = templateVars.getUrl(shortURL);

  res.render("urls_show", url);
}

// 
// render the page to create new url
// 
const getNewUrl = (req, res) => {

  const { templateVars } = req;

  res.render("urls_new", templateVars);

}

// 
// add new url
// 
const addUrl = (req, res) => {
  // generate key and save it to the db with value of longURL
  const key = generateRandomString();

  const { longURL } = req.body;

  const { templateVars } = req;

  templateVars.urls[key] = longURL;
  
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
}

// 
// update url with params and redirect to urls page
// 
const updateUrl = (req, res) => {
  // key to be updated from params
  const { id } = req.params;

  const { longURL } = req.body;

  req.templateVars[id] = longURL;

  res.redirect('/urls');
}

// 
// delete url then redirect to urls page
// 
const deleteUrl = (req, res) => {
  // key to be deleted from params
  const { key } = req.params;

  const { templateVars } = req;

  delete templateVars.urls[key];

  console.log(templateVars)

  res.redirect('/urls');
}

module.exports = { 
  getUrls,
  getUrl,
  addUrl,
  updateUrl,
  getNewUrl,
  deleteUrl,
};