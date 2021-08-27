const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(6);
}

const validateEmail = (email) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}


module.exports = {
  generateRandomString,
  validateEmail
}