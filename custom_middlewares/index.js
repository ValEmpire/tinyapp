const { getUserCookie } = require('../utils');

const getUser = (req, res, next) => {

  req["user"] = getUserCookie(req);

  next();
}

module.exports = {
  getUser
}