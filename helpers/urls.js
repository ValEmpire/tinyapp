const { URL } = require("../models/URL");

const { appendURL } = require("../utils");

// this will be called from controllers
const getURLSByUserID = async ({ userID }) => {
  try {
    // get all urls by userID from our model
    const urls = await URL.browseURLsByUserID(userID);

    // return url object
    return {
      urls,
    };
  } catch (error) {
    // this will catch all errors and pass in view to display in toast message
    throw error;
  }
};

// this will get a single url by key
const getURLByKey = async ({ key, userID }) => {
  try {
    const url = await URL.read(key, userID);

    // return url object
    return {
      url,
    };
  } catch (error) {
    // this will catch all errors and pass in view to display in toast message
    throw error;
  }
};

const editURL = async ({ key, userID, longURL }) => {
  try {
    // will check if update longURL includes spaces
    // throw if found
    if (longURL.includes(" ")) {
      throw new Error(`Looks like the url you input is invalid.`);
    }

    // will check if update longURL is more than 4 characters
    if (longURL.length < 4) {
      throw new Error(`Looks like the url you input is invalid.`);
    }

    // will append http:// if not found
    const appendhttp = appendURL(longURL);

    // pass to our model
    const url = await URL.edit(key, appendhttp, userID);

    return {
      url,
    };
  } catch (error) {
    // this will catch all errors and pass in view to display in toast message
    throw error;
  }
};

const addURL = async ({ key, longURL, userID }) => {
  try {
    // will check if update longURL includes spaces
    // throw if found
    if (longURL.includes(" ")) {
      throw new Error(`Looks like the url you input is invalid.`);
    }

    // will check if update longURL is more than 4 characters
    if (longURL.length < 4) {
      throw new Error(`Looks like the url you input is invalid.`);
    }

    // add new url with generated key, appendedURL, and userID
    const url = await URL.add({
      key,
      longURL: appendURL(longURL),
      userID,
    });

    return {
      url,
    };
  } catch (error) {
    // this will catch all errors and pass in view to display in toast message
    throw error;
  }
};

const deleteURL = async ({ key, userID }) => {
  try {
    // delete url by key
    await URL.delete(key, userID);

    return {};
  } catch (error) {
    // this will catch all errors and pass in view to display in toast message
    throw error;
  }
};

module.exports = {
  getURLSByUserID,
  getURLByKey,
  editURL,
  addURL,
  deleteURL,
};
