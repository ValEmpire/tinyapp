const urlVisitors = {
  // INITIAL FORMAT
  // "abcde" : {
  //   urlKey : idOFUrl,
  //   totalVisits : 0,
  //   totalUniqueVisitors : 0,
  //   visitors : [
  //     {
  //       "userID" : [date]
  //     },
  //    ],
  // }
};

class URLVisitor {
  constructor() {
    this.browseURLVisitorsByURLKey = this.browseURLVisitorsByURLKey.bind(this);
    this.addVisitor = this.addVisitor.bind(this);
    this.addUniqueVisitor = this.addUniqueVisitor.bind(this);
    this.init = this.init.bind(this);
  }

  // I called this if user created new redirect url
  // This will make sure we will attached the value of urlKey property
  init = ({ key, urlKey }) => {
    return new Promise((resolve, reject) => {
      if (!urlVisitors) {
        return reject(new Error("urlVisitors is not defined."));
      }

      // initialize urlVisitors
      urlVisitors[key] = {
        urlKey,
        totalVisits: 0,
        totalUniqueVisitors: 0,
        visitors: [], // I used arrays instead of objects as I think its better to push objects with userId key and time as value
      };

      return resolve("Success");
    });
  };

  // this will browse urlVisitors and look for urlKey
  browseURLVisitorsByURLKey = ({ urlKey }) => {
    return new Promise((resolve, reject) => {
      if (!urlVisitors) {
        return reject(new Error("URLS is undefined."));
      }

      let urlVisitor = {};

      for (const key in urlVisitors) {
        if (urlVisitors[key].urlKey === urlKey) {
          urlVisitor = urlVisitors[key];
          break;
        }
      }

      return resolve(urlVisitor);
    });
  };

  // I used this for updating the visitor count and adding unique visitor
  findTarget = ({ obj, urlKey }) => {
    let target = {};

    for (const key in obj) {
      if (obj[key].urlKey === urlKey) {
        target = obj[key];
        break;
      }
    }

    return target;
  };

  // with arguments of urlKey and userID,
  // this will push visitors everytime any users visit the shortURL link
  addVisitor = ({ urlKey, userID }) => {
    return new Promise((resolve, reject) => {
      const d = new Date();
      const n = d.toUTCString();

      const target = this.findTarget({ obj: urlVisitors, urlKey });

      if (Object.keys(target).length === 0) {
        return reject(new Error("Cannot find the urlVisitorsKey"));
      }

      target.totalVisits += 1;

      target.visitors.push({
        [userID]: n,
      });

      return resolve(target);
    });
  };

  // this will add uniqueVisitor if userID is not found in visitors array
  addUniqueVisitor = ({ urlKey, userID }) => {
    return new Promise((resolve, reject) => {
      const target = this.findTarget({ obj: urlVisitors, urlKey });

      let isUserUnique = true;

      for (const visits of target.visitors) {
        if (Object.keys(visits)[0] === userID) {
          isUserUnique = false;
          break;
        }
      }

      if (isUserUnique) {
        target.totalUniqueVisitors += 1;
      }

      return resolve();
    });
  };
}

const newURLVisitor = new URLVisitor();

module.exports = {
  URLVisitor: newURLVisitor,
  urlVisitors,
};
