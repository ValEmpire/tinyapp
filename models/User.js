const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "$2b$10$stCSDePX3HdPffb8OrEt8OCvnKbAkw9SyxWwCxuCfTeqhBwGmXLWq", // purple-monkey-dinosaur
  },

  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "$2b$10$fJl4q7SDN2B7mWmJjmEhnOUXX045vzSkaNVnQxpfZh5F5uipXxesO", // dishwasher-funk
  },
};

class User {
  constructor() {
    this.findUser = this.findUser.bind(this);
    this.readByEmail = this.readByEmail.bind(this);
    this.readById = this.readById.bind(this);
    this.add = this.add.bind(this);
  }

  // Iterate objects of objects and look for the same email
  findUser = (email) => {
    for (const ids in users) {
      if (users[ids]["email"] === email) {
        return users[ids];
      }
    }

    return null;
  };

  // Iterate objects of objects and look for the same email
  // Return null if userId is not found
  findUserById = (id) => {
    for (const ids in users) {
      if (users[ids]["id"] === id) {
        return users[ids];
      }
    }

    return null;
  };

  readByEmail = (email) => {
    return new Promise((resolve, reject) => {
      const user = this.findUser(email);

      resolve(user);
      return;
    });
  };

  readById = (id) => {
    return new Promise((resolve, reject) => {
      const user = this.findUserById(id);

      resolve(user);
      return;
    });
  };

  // add new user to users
  add = ({ id, email, password }) => {
    return new Promise((resolve, reject) => {
      // reject if email or password is undefined
      if (!email || !password) {
        reject(
          new Error(`${email ? "Password is required" : "Email is required."}`),
        );
        return;
      }

      // find the user by email
      const user = this.findUser(email);

      // reject if user already exists
      if (user) {
        reject(new Error("User already exists."));
        return;
      }

      // save user with key of userId
      users[id] = {
        id,
        email,
        password,
      };

      resolve(users[id]);
      return;
    });
  };
}

const NewUser = new User();

module.exports = {
  User: NewUser,
  users,
};
