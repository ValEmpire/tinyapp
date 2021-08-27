const User = require('../models/User');
const { generateRandomString } = require('../utils')

const addUser = async(req, res) => {
  try{

    const { email , password } = req.body; 

    const id = generateRandomString();

    const user = new User(id, email, password);

    await user.add();

    res.cookie('user', user)

    res.redirect('/urls');

  }catch(error){

    console.log(error)

    res.cookie('error', error)

    res.render('registration', {
      user : null
    });
  }
}

module.exports = { addUser };