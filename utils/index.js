const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(6);
};

const validateEmail = (email) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
};

const getUserCookie = (req) => {
  return req.session["userID"];
};

const setUserCookie = (req, user) => {
  return (req.session.userID = user.id);
};

const setMessageCookie = (res, type, message) => {
  var date = new Date();
  date.setTime(date.getTime() + 1000);
  return res.cookie(type, message, { expires: date });
};

const clearMessageCookie = (res) => {
  res.clearCookie("error");
  res.clearCookie("success");
};

const clearUserCookie = (req) => {
  req.session = null;
};

const appendURL = (url) => {
  if (url.length <= 7) {
    return `http://${url}`;
  }

  const getChars = url.substring(0, 7);

  if (!getChars.includes("http")) {
    return `http://${url}`;
  }

  return url;
};

module.exports = {
  generateRandomString,
  validateEmail,
  getUserCookie,
  setUserCookie,
  clearUserCookie,
  setMessageCookie,
  clearMessageCookie,
  appendURL,
  hashPassword,
  comparePassword,
};
