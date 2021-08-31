const { getUserCookie, setMessageCookie } = require('../utils');
const User = require("../models/User")

const authUser = async (req, res, next) => {
  try{
    const userID = getUserCookie(req);

    if(!userID) throw new Error('Only login users can access protected route.');
  
    const user = await User.readById(userID);
  
    if (!user) throw new Error('Invalid or expired cookie.')
  
    req["user"] = user;
  
    next();

  }catch(error){

    setMessageCookie(res, 'error', error.message)

    res.redirect('/login');
    
    return;
  }
}

module.exports = {
  authUser
}