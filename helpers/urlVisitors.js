const { URLVisitor } = require('../models/URLVisitor');

const initUrlVisitor = async ({ key, urlKey }) => {
  try{

    await URLVisitor.init({ key, urlKey });

  }catch(error){
    throw error;
  }
}

const getURLVisitorsByURLKey = async ({ urlKey }) => {
  try{

    const urlVisitors = await URLVisitor.browseURLVisitorsByURLKey({ urlKey });

    return {
      urlVisitors
    };

  }catch(error){
    throw error;
  }
}

module.exports = {
  initUrlVisitor,
  getURLVisitorsByURLKey,
};