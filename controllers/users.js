const User = require('../models/User');
const {
  generateRandomString,
  validateEmail,
  setUserCookie,
  clearUserCookie,
  setMessageCookie,
  hashPassword,
  clearMessageCookie,
  comparePassword,
} = require('../utils')

const addUser = async(req, res) => {

  const { email , password } = req.body;

  try{
    const isValidEmail = validateEmail(email);

    if(!isValidEmail) throw new Error('Email is not valid.');

    if(password.length <= 5) throw new Error('Password should be atleast 6 characters long.');

    const id = generateRandomString();

    const user = await User.add({id, email:email.toLowerCase(), password : hashPassword(password)});

    setUserCookie(req, user)

    res.redirect('/urls');

    return;

  }catch(error){

    setMessageCookie(res, 'error', error.message);

    res.render('registration', { email , password});

    return;
  }
}

const readUser = async(req, res) => {
  const { email , password } = req.body;

  try{
    const user = await User.read(email);

    if(!user || !comparePassword(password, user.password)) throw new Error('Incorrect credentials.');

    setUserCookie(req, user);

    res.redirect('/urls');

    return;

  }catch(error){

    console.log(error)

    setMessageCookie(res, 'error', error.message);

    res.render('login', { email, password });

    return;
  }
}

const renderLoginPage = async(req, res) => {
  res.render('login')

  return;
}

const renderRegistrationPage = (req, res) => {
  res.render('registration')

  return;
}

const logout = (req, res) => {

  clearMessageCookie(res);

  clearUserCookie(req);

  res.redirect('/login');

}

module.exports = { addUser, readUser, renderLoginPage, renderRegistrationPage, logout };