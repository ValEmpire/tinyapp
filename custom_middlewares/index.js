const getUsername = (req, res, next) => {

  req.templateVars["username"] = req.cookies['username']

  next();
}

module.exports = {
  getUsername
}