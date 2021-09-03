const chai = require('chai');

const { assert } = chai;

chai.should();

chai.use(require('chai-as-promised'));

const {
  registerUser,
  getUserByEmail,
  checkPassword
} = require('../helpers/users');

const { users } = require('../models/User');

const { generateRandomString } = require('../utils');

describe('registerUser', () => {
  it('should add new user with hash password to the database', async () => {

    const key = generateRandomString();

    const input = {
      key,
      email : "val@example.com",
      password : "simple1"
    }

    const { user } = await registerUser(input).should.not.be.rejected;

    assert.strictEqual(input.email, user.email);
    assert.notEqual(input.password, user.password);
    assert.strictEqual(Object.keys(users).length, 3);
  });

  it('should throws an error if email or password is undefined', async () => {

    await registerUser().should.be.rejectedWith(Error);
    
  });
});

describe('checkPassword', () => {
  it('should return true if hashedPassword and password is compared', async () => {

    const input = {
      email : "empire@example.com",
      password : "simple1"
    }

    const { user } = await registerUser(input).should.not.be.rejected;

    const { isMatch } = checkPassword({ password : input.password, hashPassword : user.password });

    assert.isTrue(isMatch);

  });
});

describe('getUserByEmail', () => {
  it('should throw error if email is invalid or does not exists', async () => {
    await getUserByEmail({ email : "doNotExists" }).should.be.rejectedWith(Error);
  });

  it('should return a user object if email is valid and is found', async () => {
    const { user } = await getUserByEmail({ email : "user@example.com" }).should.not.be.rejected;

    assert.isObject(user);
  });

  it('should return a user if email is valid and found', async () => {
    const { user } = await getUserByEmail({ email : "user@example.com" }).should.not.be.rejected;

    const expectedOutput = {
      id: "userRandomID", 
      email: "user@example.com", 
      password: "purple-monkey-dinosaur"
    };

    assert.deepEqual(user, expectedOutput);
  });

});
