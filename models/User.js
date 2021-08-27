const users = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}

class User {

  constructor() {
    this.findUser = this.findUser.bind(this);
    this.read = this.read.bind(this);
    this.add = this.add.bind(this);
  }

  // Iterate objects of objects and look for the same email
  findUser = (email) => {
    for(const ids in users){
      if(users[ids]["email"] === email){
        return users[ids];
      }
    }

    return null;
  }

  read = (email) => {
    return new Promise((resolve, reject) => {

      const user = this.findUser(email);

      resolve(user);
      return;
    });
  }

  add = ({id, email, password}) => {

    return new Promise((resolve, reject) => {

      const user = this.findUser(email);

      if(user){
        reject(new Error('User already exists.'))
        return;
      }

      users[id] = {
        id,
        email,
        password,
      }

      resolve(users[id]);
      return;
    });
  }
}

const NewUser = new User();

module.exports = NewUser;