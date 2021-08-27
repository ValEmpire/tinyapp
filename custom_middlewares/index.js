const getUser = (req, res, next) => {

  req["user"] = req.cookies["user"]

  next();
}

module.exports = {
  getUser
}