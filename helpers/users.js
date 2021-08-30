const {
  generateRandomString,
  validateEmail,
  hashPassword,
  comparePassword,
} = require('../utils');

const User = require('../models/User');

const registerUser = async({ email, password }) => {

  try{
    const isValidEmail = validateEmail(email);

    if(!isValidEmail) throw new Error('Email is not valid.');

    if(password.length <= 5) throw new Error('Password should be atleast 6 characters long.');

    const id = generateRandomString();

    const user = await User.add({id, email:email.toLowerCase(), password : hashPassword(password)});

    return {
      user,
    };

  }catch(error){
    return {
      error: error.message,
    }
  }
};

const getUserByEmail = async({ email, password}) => {
  try{
    const user = await User.readByEmail(email);

    if(!user || !comparePassword(password, user.password)) throw new Error('Incorrect credentials.');

    return {
      user,
    }

  }catch(error){
    return {
      error : error.message,
    }
  }
}

module.exports = { registerUser, getUserByEmail };