const bcrypt = require("bcrypt");

// has the password
// not sure why compass recommends hashSync as synchronous is blocking the node workers
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

// This will generate a random string,
// Use for keys and ids of models
const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(6);
};

// Use to validate emails
// This will check if email is valid using regex
// return true if valid and false if not valid
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

// setMessageCookie
// use for message toasts
// I put the expiration 1 second
// Good enought to display the message as flash
const setMessageCookie = (res, type, message) => {
  var date = new Date();
  date.setTime(date.getTime() + 1000);
  return res.cookie(type, message, { expires: date });
};

// this will clear all message cookies
// I called this function before logout
const clearMessageCookie = (res) => {
  res.clearCookie("error");
  res.clearCookie("success");
};

const clearUserCookie = (req) => {
  req.session = null;
};

// This function will add http:// if submitted url has none
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
