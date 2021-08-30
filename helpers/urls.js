const URL = require('../models/URL');

const {
  generateRandomString,
  fixLongURL
} = require("../utils");

const browseURLsByUserIDHelper = async ({ userID }) => {
  try{
    const urls = await URL.browseURLsByUserID(userID);

    return {
      urls,
    }

  }catch(error){
    return {
      error: error.message
    }
  }
}

const readURLHelper = async ({ key }) => {
  try{
    const url = await URL.read(key);

    return {
      url,
    }

  }catch(error){
    return {
      error,
    }
  }
}

const editURLHelper = async ({ key, userID, longURL }) => {
  try{
    const url = await URL.edit(key, fixLongURL(longURL), userID);

    return {
      url,
    }

  }catch(error){
    return {
      error,
    }
  }
}

const addURLHelper = async ({ longURL, userID }) => {
  try{
    const randomKey = generateRandomString();

    const url = await URL.add({
      key : randomKey,
      longURL :  fixLongURL(longURL),
      userID,
    });

    return {
      url,
    };

  }catch(error){
    return {
      error,
    };
  }
}

// 
// delete url then redirect to urls page
// 
const deleteURLHelper = async ({ key, userID }) => {
  try{
    await URL.delete(key, userID);

    return {};

  }catch(error){

    return {
      error,
    }
  }
}

module.exports = { 
  browseURLsByUserIDHelper,
  readURLHelper,
  editURLHelper,
  addURLHelper,
  deleteURLHelper,
};