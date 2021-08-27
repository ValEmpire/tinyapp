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

const setMessageCookie = (res, type, message) => {
  var date = new Date();
  date.setTime(date.getTime() + (1000));
  return res.cookie(type, message, { expires : date });
}

const clearMessageCookie = (res) => {
  res.clearCookie('error');
  res.clearCookie('success');
}

const clearUserCookie = (res) => {
  clearMessageCookie(res);
  res.clearCookie('user');
}

module.exports = {
  generateRandomString,
  validateEmail,
  getUserCookie,
  setUserCookie,
  clearUserCookie,
  setMessageCookie,
  clearMessageCookie,
}