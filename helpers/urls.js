const URL = require('../models/URL');

const {
  generateRandomString,
  fixLongURL
} = require("../utils");

const getURLSByUserID = async ({ userID }) => {
  try{
    const urls = await URL.browseURLsByUserID(userID);

    return {
      urls,
    }

  }catch(error){
    throw error;
  }
}

const getURLByKey = async ({ key }) => {
  try{
    const url = await URL.read(key);

    return {
      url,
    }

  }catch(error){
    throw error;
  }
}

const editURLByKey = async ({ key, userID, longURL }) => {
  try{
    const url = await URL.edit(key, fixLongURL(longURL), userID);

    return {
      url,
    }

  }catch(error){
    throw error;
  }
}

const addURL = async ({ longURL, userID }) => {
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
    throw error;
  }
}

// 
// delete url then redirect to urls page
// 
const deleteURL = async ({ key, userID }) => {
  try{
    await URL.delete(key, userID);

    return {};

  }catch(error){
    throw error;
  }
}

module.exports = { 
  getURLSByUserID,
  getURLByKey,
  editURLByKey,
  addURL,
  deleteURL,
};