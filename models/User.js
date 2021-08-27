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
  constructor(id, email, password){
    this.id = id;
    this.email = email;
    this.password = password;
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

  static read = (email) => {
    return new Promise((resolve, reject) => {
      const user = this.findUser(email);

      resolve(user);
      return;
    });
  }

  add = () => {

    return new Promise((resolve, reject) => {

      const user = this.findUser(this.email);

      if(user){
        reject(new Error('User already exists.'))
        return;
      }

      users[this.id] = {
        id : this.id,
        email : this.email,
        password : this.password,
      }

      resolve(users[this.id]);
      return;
    });
  }


}

module.exports = User;