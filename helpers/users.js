const { validateEmail, hashPassword, comparePassword } = require("../utils");

const { User } = require("../models/User");

const registerUser = async ({ key, email, password }) => {
  try {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) throw new Error("Email is not valid.");

    if (password.length <= 5)
      throw new Error("Password should be atleast 6 characters long.");

    const user = await User.add({
      id: key,
      email: email.toLowerCase(),
      password: hashPassword(password),
    });

    return {
      user,
    };
  } catch (error) {
    throw error;
  }
};

const checkPassword = ({ password, hashPassword }) => {
  const isMatch = comparePassword(password, hashPassword);

  if (!isMatch) throw new Error("Incorrect email or password.");

  return {
    isMatch,
  };
};

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
