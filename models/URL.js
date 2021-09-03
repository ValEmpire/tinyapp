const urls = {
  abc01: {
    longURL: "https://www.facebook.com",
    userID: "val02",
  },

  abc02: {
    longURL: "https://www.stockoverflow.com",
    userID: "val02",
  },

  abc03: {
    longURL: "https://www.google.com",
    userID: "other",
  },

  abc04: {
    longURL: "https://www.wikipedia.org",
    userID: "other",
  },
};

class URL {
  constructor() {
    this.browse = this.browse.bind(this);
    this.read = this.read.bind(this);
    this.edit = this.edit.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.browseURLsByUserID = this.browseURLsByUserID.bind(this);
  }

  // this will return all urls
  browse = () => {
    return new Promise((resolve, reject) => {
      if (urls === undefined) {
        reject(new Error("Urls is undefined."));
        return;
      }

      resolve(urls);
      return;
    });
  };

  // this will return url by key
  read = (key) => {
    return new Promise((resolve, reject) => {
      const url = urls[key];

      if (!url) {
        reject(new Error(`Value of ${key} is not found.`));
        return;
      }

      resolve({
        [key]: url,
      });
      return;
    });
  };

  // this will edit url if userId is the same value of userID
  edit = (key, value, userID) => {
    return new Promise((resolve, reject) => {
      const url = urls[key];

      if (!url) {
        reject(new Error(`Value of ${key} is not found.`));
        return;
      }

      if (url["userID"] !== userID) {
        reject(new Error(`Cannot update someones url.`));
        return;
      }

      url["longURL"] = value;

      // return updated value
      return resolve({
        [key]: url,
      });
    });
  };

  add = ({ key, longURL, userID }) => {
    return new Promise((resolve, reject) => {
      const url = urls[key];

      if (url !== undefined) {
        reject(new Error(`${key} already exists.`));
        return;
      }

      urls[key] = {
        longURL,
        userID,
      };

      // return object with new key and value of longURL and userID
      return resolve({
        [key]: urls[key],
      });
    });
  };

  // this will only delete if userID is the same as url userID
  delete = (key, userID) => {
    return new Promise((resolve, reject) => {
      const url = urls[key];

      if (!url) {
        reject(new Error(`${key} does not exists.`));
        return;
      }

      if (url["userID"] !== userID) {
        reject(new Error(`Cannot delete someones url.`));
        return;
      }

      resolve(delete urls[key]);
      return;
    });
  };

  // will return urls by usersID
  // this will make sure only urls of logged in user is allowed to access his own urls
  browseURLsByUserID = (userID) => {
    return new Promise((resolve, reject) => {
      if (urls === undefined) {
        reject(new Error("Urls is undefined."));
        return;
      }

      let result = {};

      for (const key in urls) {
        if (urls[key].userID === userID) {
          result[key] = urls[key];
        }
      }

      resolve(result);
    });
  };
}

const NewURL = new URL();

module.exports = {
  URL: NewURL,
  urls,
};
