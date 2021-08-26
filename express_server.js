const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

function generateRandomString() {
  return (Math.random() + 1).toString(36).substring(6);
}

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {

  const { shortURL } = req.params;

  const templateVars = { shortURL: shortURL, longURL: urlDatabase[shortURL] };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {

  const key = generateRandomString();
  const { longURL } = req.body;

  // generate key and save it to the db with value of longURL
  urlDatabase[key] = longURL;
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:key/delete", (req, res) => {
  
  // key to be deleted from params
  const { key } = req.params;

  delete urlDatabase[key];

  res.redirect('/urls');

});

app.get("/u/:shortURL", (req, res) => {

  const { shortURL } = req.params;

  const longURL = urlDatabase[shortURL]
  
  res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});