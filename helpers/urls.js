const { URL } = require('../models/URL');

const {
  generateRandomString,
  appendURL
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

const getURLByKey = async ({ key, userID }) => {
  try{
    const url = await URL.read(key, userID);

    return {
      url,
    }

  }catch(error){
    throw error;
  }
}

const editURL = async ({ key, userID, longURL }) => {
  try{

    const appendhttp = appendURL(longURL);

    const url = await URL.edit(key, appendhttp, userID);

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
      longURL :  appendURL(longURL),
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
  editURL,
  addURL,
  deleteURL,
};