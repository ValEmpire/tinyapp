const { getUserCookie, setMessageCookie } = require('../utils');
const User = require("../models/User")

const getUser = async (req, res, next) => {
  try{
    const userCookie = getUserCookie(req);

    if(!userCookie) throw new Error('No cookie found.');
  
    const user = await User.read(userCookie["email"]);
  
    if (!user) throw new Error('Cannot find user with given cookie.')
  
    req["user"] = user;
  
    next();

  }catch(error){

    setMessageCookie(res, 'error', error.message)

    res.redirect('/login');
    
    return;
  }
}

module.exports = {
  getUser
}