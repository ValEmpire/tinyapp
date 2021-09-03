const { URLVisitor } = require("../models/URLVisitor");

// this will be called after user added new url
// we will get the urlKey and pass it to urlVisitor.urlKey
// this will make sure we will only target this url for adding visitors and unique visitors
const initUrlVisitor = async ({ key, urlKey }) => {
  try {
    await URLVisitor.init({ key, urlKey });
  } catch (error) {
    // catch if errors are found
    throw error;
  }
};

// this will return url visitors by key with all properties and values
const getURLVisitorsByURLKey = async ({ urlKey }) => {
  try {
    const urlVisitors = await URLVisitor.browseURLVisitorsByURLKey({ urlKey });

    return {
      urlVisitors,
    };
  } catch (error) {
    // catch if errors are found
    throw error;
  }
};

module.exports = {
  initUrlVisitor,
  getURLVisitorsByURLKey,
};
