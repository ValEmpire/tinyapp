const { validateEmail, hashPassword, comparePassword } = require("../utils");

const { User } = require("../models/User");

// this will add new user and return newly added user
const registerUser = async ({ key, email, password }) => {
  try {
    // validate email using regex
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) throw new Error("Email is not valid.");

    if (password.length <= 5)
      throw new Error("Password should be atleast 6 characters long.");

    const user = await User.add({
      id: key,
      email: email.toLowerCase(), // this will make sure that all emails are all in lowercase
      password: hashPassword(password), // this will hash the password before saving to users
    });

    return {
      user,
    };
  } catch (error) {
    // catch and pass error to view if any
    throw error;
  }
};

// use bcrypt to match hashedPassword and string password
const checkPassword = ({ password, hashPassword }) => {
  const isMatch = comparePassword(password, hashPassword);

  if (!isMatch) throw new Error("Incorrect email or password.");

  return {
    isMatch,
  };
};

// get user by email
// if user is falsy throw incorrect amil or password
const getUserByEmail = async ({ email }) => {
  try {
    const user = await User.readByEmail(email);

    if (!user) throw new Error("Incorrect email or password.");

    return {
      user,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, getUserByEmail, checkPassword };
