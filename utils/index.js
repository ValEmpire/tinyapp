const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(6);
}

const validateEmail = (email) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

const getUserCookie = (req) => {
  return req.cookies["user"];
}

const setUserCookie = (res, user) => {
  return res.cookie('user', user);
}

const clearUserCookie = (res) => {
  res.clearCookie('user');
}

module.exports = {
  generateRandomString,
  validateEmail,
  getUserCookie,
  setUserCookie,
  clearUserCookie
}