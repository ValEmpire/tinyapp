const express = require("express");
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
// const morgan = require('morgan');

// Initialize app
const app = express();

// Middlewares
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// set templating engine
app.use(expressLayouts);
app.set('layout', './layouts')
app.use( express.static( "public" ));
app.set("view engine", "ejs");

// routes
app.use("/", require("./routes/auth"));
app.use("/urls", require("./routes/urls"));
app.use("/u", require("./routes/u"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});