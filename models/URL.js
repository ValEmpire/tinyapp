const urls = {
  'some' : 'https://google.com'
};

class URL {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  };

  static browse = () => {
    return new Promise((resolve, reject) => {

      if(urls === undefined) {
        reject(new Error('Urls is undefined.'))
        return;
      }

      resolve(urls);
      return;
    });
  };

  static read = (key) => {
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

  static edit = (key, value) => {
    return new Promise((resolve, reject) => {

      const url = urls[key];

      if(!url) {
        reject(new Error(`Value of ${key} is not found.`))
        return;
      }

      resolve(
        urls[key] = value
      );
      return;

    });
  };

  add = () => {
    return new Promise((resolve, reject) => {

      const url = urls[this.key];

      if(url !== undefined) {
        reject(new Error(`${this.key} already exists.`));
        return;
      }

      resolve(urls[this.key] = this.value);
      return;
    });
  };

  static delete = (key) => {
    return new Promise((resolve, reject) => {

      const url = urls[key];

      if(!url) {
        reject(new Error(`${key} does not exists.`));
        return;
      }

      resolve(delete urls[key])
      return;

    });
  };

}

module.exports = URL;