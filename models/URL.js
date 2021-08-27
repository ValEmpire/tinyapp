const urls = {
  /*

  where the key is the short url

  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW"
  }

  */
};

class URL {
  constructor() {
    this.browse = this.browse.bind(this);
    this.read = this.read.bind(this);
    this.edit = this.edit.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.browseURLsByUserID = this.browseURLsByUserID.bind(this);
  };

  browse = () => {
    return new Promise((resolve, reject) => {

      if(urls === undefined) {
        reject(new Error('Urls is undefined.'))
        return;
      }

      resolve(urls);
      return;
    });
  };

  read = (key) => {
    return new Promise((resolve, reject) => {

      const url = urls[key];

      if(!url){
        reject(new Error(`Value of ${key} is not found.`));
        return;
      }

      resolve(url);
      return;

    });
  };

  edit = (key, value, userID) => {
    return new Promise((resolve, reject) => {

      const url = urls[key];

      if(!url) {
        reject(new Error(`Value of ${key} is not found.`))
        return;
      }

      if(url["userID"] !== userID) {
        reject(new Error(`Cannot update someones url.`))
        return;
      }

      resolve(
        url['longURL'] = value,
      );
      return;

    });
  };

  add = ({key, longURL, userID}) => {
    return new Promise((resolve, reject) => {

      const url = urls[key];

      if(url !== undefined) {
        reject(new Error(`${key} already exists.`));
        return;
      }

      resolve(urls[key] = {
        longURL,
        userID,
      });

      return;
    });
  };

  delete = (key, userID) => {
    return new Promise((resolve, reject) => {

      const url = urls[key];

      if(!url) {
        reject(new Error(`${key} does not exists.`));
        return;
      }

      if(url["userID"] !== userID) {
        reject(new Error(`Cannot delete someones url.`))
        return;
      }

      resolve(delete urls[key])
      return;

    });
  };

  browseURLsByUserID = (userID) => {
    return new Promise((resolve, reject) =>{

      if(urls === undefined) {
        reject(new Error('Urls is undefined.'))
        return;
      }

      let result = {};

      for(const key in urls){
        if(urls[key].userID === userID){
          result[key] = urls[key]; 
        }
      }

      resolve(result);
    })
  }
}

const NewURL = new URL();

module.exports = NewURL;