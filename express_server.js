const express = require("express");
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
// const morgan = require('morgan');

// Initialize app
const app = express();

// Middlewares
// app.use(morgan('dev'));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: [
      process.env.MY_SECRET_KEY || "mySecretKey",
      process.env.MY_SECRET_KEY_2 || "mySecretKey2",
    ],
  }),
);

// set templating engine
app.use(expressLayouts);
app.set("layout", "./layouts");
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/urls", require("./routes/urls"));
app.use("/u", require("./routes/u"));

app.listen(PORT, () => {
  console.log(`tinyURL is listening on ${PORT}!`);
});
