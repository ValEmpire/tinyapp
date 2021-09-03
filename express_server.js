const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
const morgan = require("morgan");

// Initialize app
const app = express();

// Middlewares
app.use(morgan("dev")); // development
// app.use(morgan('combined')); // production
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
app.set("layout", "./layouts"); // I used expressLayouts for easier ejs templating
app.use(express.static("public")); // this is the directory for assets
app.set("view engine", "ejs");

// routes
app.use("/", require("./routes/index")); // Home
app.use("/", require("./routes/auth")); // Users and authentication
app.use("/urls", require("./routes/urls")); // URLS
app.use("/u", require("./routes/u")); // Redirection

// 404 PAGE
// THis should always be last after routes
app.get("*", function (req, res) {
  res.render("404", {
    error: `Cannot find the requested page.`,
    backURL: "/login",
  });
});

const PORT = process.env.PORT || 8080; // process.env.PORT for production

app.listen(PORT, () => {
  console.log(`tinyURL is listening on ${PORT}!`);
});
