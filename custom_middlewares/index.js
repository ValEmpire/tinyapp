const getUsername = (req, res, next) => {

  req["username"] = req.cookies['username']

  next();
}

module.exports = {
  getUsername
}