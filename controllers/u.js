const { URL } = require("../models/URL");

const { URLVisitor } = require("../models/URLVisitor");

const {
  getUserCookie,
  generateRandomString,
  setUserCookie,
} = require("../utils");

const URLRedirectController = async (req, res) => {
  try {
    const { shortURL } = req.params;

    const url = await URL.read(shortURL);

    const urlKey = Object.keys(url)[0];

    // Since this endpoint is publicly accessible
    // getUserCookie may return undefined
    let userID = getUserCookie(req);

    // generateRandomString and set another cookie session
    if (!userID) {
      userID = generateRandomString();
      setUserCookie(req, { id: userID });
    }

    await URLVisitor.addUniqueVisitor({ urlKey, userID });

    await URLVisitor.addVisitor({ urlKey, userID });

    return res.redirect(url[urlKey].longURL);
  } catch (error) {
    return res.render("404", {
      error: `Cannot find redirect url.`,
      backURL: "/login",
    });
  }
};

module.exports = { URLRedirectController };
