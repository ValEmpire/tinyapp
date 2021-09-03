const urlVisitors = {
  // FORMAT initial
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

  init = ({ key, urlKey }) => {
    return new Promise((resolve, reject) => {
      if (!urlVisitors) {
        return reject(new Error("urlVisitors is not defined."));
      }

      urlVisitors[key] = {
        urlKey,
        totalVisits: 0,
        totalUniqueVisitors: 0,
        visitors: [],
      };

      return resolve("Success");
    });
  };

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
