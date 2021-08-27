const User = require('../models/User');
const {
  generateRandomString,
  validateEmail,
  setUserCookie,
  clearUserCookie,
} = require('../utils')

const addUser = async(req, res) => {
  try{

    const { email , password } = req.body;

    const isValidEmail = validateEmail(email);

    if(!isValidEmail) throw new Error('Email is not valid.');

    if(password.length <= 5) throw new Error('Password should be atleast 6 characters long.');

    const id = generateRandomString();

    const user = await User.add({id, email, password});

    setUserCookie(res, user)

    res.redirect('/urls');

    return;

  }catch(error){

    res.cookie('error', error.message)

    res.redirect('registration');

    return;
  }
}

const readUser = async(req, res) => {
  try{

    const { email , password } = req.body;

    const user = await User.read(email);

    if(user.password !== password) throw new Error('Incorrect credentials.');

    setUserCookie(res, user);

    res.redirect('/urls');

    return;

  }catch(error){

    console.log(error);

    res.cookie('error', error.message)

    res.redirect('login');

    return;
  }
}

const renderLoginPage = async(req, res) => {

  if(req.user) {
    res.redirect('/urls');

    return;
  }

  res.render('login', {
    user : null
  })

  return;
}

const renderRegistrationPage = (req, res) => {

  if(req.user) {
    res.redirect('/urls');

    return;
  }

  res.render('registration', {
    user : null
  })

  return;
}

const logout = (req, res) => {

  clearUserCookie(res);

  res.redirect('/registration');

}

module.exports = { addUser, readUser, renderLoginPage, renderRegistrationPage, logout };