const { URL } = require('../models/URL');

const {
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
    if(longURL.includes(" ")){
      throw new Error(`Looks like the url you input is invalid.`);
    }

    if(longURL.length < 4){
      throw new Error(`Looks like the url you input is invalid.`);
    }

    const appendhttp = appendURL(longURL);

    const url = await URL.edit(key, appendhttp, userID);

    return {
      url,
    }

  }catch(error){
    throw error;
  }
}

const addURL = async ({ key, longURL, userID }) => {
  try{
    if(longURL.includes(" ")){
      throw new Error(`Looks like the url you input is invalid.`);
    }

    if(longURL.length < 4){
      throw new Error(`Looks like the url you input is invalid.`);
    }

    const url = await URL.add({
      key,
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