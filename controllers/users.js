const {
  setUserCookie,
  clearUserCookie,
  setMessageCookie,
  clearMessageCookie,
  generateRandomString,
} = require('../utils');

const {
  registerUser,
  checkPassword,
  getUserByEmail,
} = require('../helpers/users');

// this will add users to db with registerUser Function
// if successful redirect to urls page
// if error is present, set the messagecookie error then render registration page with email, password
const addUser = async(req, res) => {
  const { email , password } = req.body;

  const key = generateRandomString();

  try{
    const { user } = await registerUser({ key, email, password });

    setUserCookie(req, user);
  
    return res.redirect('/urls');

  }catch(error){
    setMessageCookie(res, 'error', error.message);

    return res.render('registration', { email , password});
  }
};

// this will retrieve users from db
// if successful redirect to urls page
// if error is present, set the messagecookie error then render login page with email, password
const readUser = async(req, res) => {
  const { email , password } = req.body;

  try{
    const { user } = await getUserByEmail({ email, password });

    const { isMatch } = checkPassword({ password, hashPassword : user.password });
  
    if(!isMatch) {
      setMessageCookie(res, 'error', 'Incorrect email or password.');
      return res.render('login', { email, password });
    }
  
    setUserCookie(req, user);
  
    return res.redirect('/urls');
  }catch(error){
    setMessageCookie(res, 'error', error.message);
    return res.render('login', { email, password });
  }
}

// This will render login page
const renderLoginPage = async(req, res) => {
  return res.render('login')
}

// THis will render registration page
const renderRegistrationPage = (req, res) => {
  return res.render('registration')
}

// this will redirect to login page after clearning message cookies and users session
const logout = (req, res) => {
  clearMessageCookie(res);

  clearUserCookie(req);

  return res.redirect('/login');
}

module.exports = { addUser, readUser, renderLoginPage, renderRegistrationPage, logout };