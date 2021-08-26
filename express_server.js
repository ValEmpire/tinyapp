const express = require("express");
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan');

// Initialize app
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Initialize templateVars to

const templateVars = {
  urls : {},
  getUrl : function(key) {
    return {
      [key] : this.urls[key],
    }
  }
};

app.use((req, res, next) => {
  req.templateVars = templateVars;
  return next();
})

// set templating engine
app.use(expressLayouts);
app.set('layout', './layouts')
app.set("view engine", "ejs");

// routes
app.use("/", require("./routes"));
app.use("/urls", require("./routes/urls"));
app.use("/auth", require("./routes/auth"));
app.use("/u", require("./routes/u"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});