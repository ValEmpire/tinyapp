const User = require('../models/User');
const { generateRandomString, validateEmail } = require('../utils')

const addUser = async(req, res) => {
  try{

    const { email , password } = req.body;

    const isValidEmail = validateEmail(email);

    if(!isValidEmail) throw new Error('Email is not valid.');

    if(password.length <= 5) throw new Error('Password should be atleast 6 characters long.');

    const id = generateRandomString();

    const user = new User(id, email, password);

    await user.add();

    res.cookie('user', user)

    res.redirect('/urls');

  }catch(error){

    res.cookie('error', error.message)

    res.redirect('registration');
  }
}

module.exports = { addUser };