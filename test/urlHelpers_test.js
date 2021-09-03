const { expect } = require("chai");
const chai = require("chai");
const { assert } = chai;
chai.should();
chai.use(require("chai-as-promised"));

const {
  getURLSByUserID,
  getURLByKey,
  editURL,
  addURL,
  deleteURL,
} = require("../helpers/urls");

const { generateRandomString } = require("../utils");

const { urls } = require("../models/URL");

describe("getURLSByUserID", () => {
  it("should return objects with all urls by user ID", async () => {
    const userID = "val02";

    const { urls } = await getURLSByUserID({ userID }).should.not.be.rejected;

    const expectedOutput = {
      abc01: { longURL: "https://www.facebook.com", userID: "val02" },
      abc02: { longURL: "https://www.stockoverflow.com", userID: "val02" },
    };

    assert.deepEqual(urls, expectedOutput);
    assert.isObject(urls);
    assert.deepEqual(Object.keys(urls).length, 2);
  });

  it("should return empty object if userID does not exists", async () => {
    const userID = "notExists";

    const { urls } = await getURLSByUserID({ userID }).should.not.be.rejected;

    expect(urls).to.be.empty;
  });

  it("should throws an error userID is undefined", async () => {
    await getURLSByUserID().should.be.rejectedWith(Error);
  });
});

describe("getURLByKey", () => {
  it("should return object with url by key", async () => {
    const input = {
      userID: "val02",
      key: "abc01",
    };

    const { url } = await getURLByKey(input).should.not.be.rejected;

    const expectedOutput = {
      abc01: {
        longURL: "https://www.facebook.com",
        userID: "val02",
      },
    };

    assert.isObject(url);
    assert.deepEqual(url, expectedOutput);
  });

  it("should throws an error if userID or key is undefined", async () => {
    await getURLByKey().should.be.rejectedWith(Error);
  });
});

describe("editURL", () => {
  it("should update and return updated url object if the owner of url is the authenticated user", async () => {
    const input = {
      key: "abc01",
      userID: "val02",
      longURL: "https://www.linkedin.com",
    };

    const { url } = await editURL(input).should.not.be.rejected;

    const expectedOutput = {
      abc01: {
        longURL: "https://www.linkedin.com",
        userID: "val02",
      },
    };

    assert.isObject(url);
    assert.deepEqual(url, expectedOutput);
  });

  it("should throw an error if someone is updating the key", async () => {
    const input = {
      key: "abc01",
      userID: "other",
      longURL: "https://www.linkedin.com",
    };

    await editURL(input).should.be.rejectedWith(Error);
  });

  it("should throw an error if key or userID or longURL is undefined", async () => {
    await editURL().should.be.rejectedWith(Error);
  });

  it("should throw an error if url has spaces or less than 4 characters", async () => {
    const input1 = {
      key: "abc01",
      userID: "other",
      longURL: "https://www.l .com",
    };
    const input2 = {
      key: "abc01",
      userID: "other",
      longURL: "fds",
    };

    await editURL(input1).should.be.rejectedWith(Error);
    await editURL(input2).should.be.rejectedWith(Error);
  });
});

describe("addURL", () => {
  it("should add and return updated newly added url object", async () => {
    const key = generateRandomString();

    const input = {
      key,
      userID: "val02",
      longURL: "https://www.youtube.com",
    };

    const { url } = await addURL(input).should.not.be.rejected;

    const expectedOutput = {
      [key]: {
        longURL: "https://www.youtube.com",
        userID: "val02",
      },
    };

    assert.isObject(url);
    assert.deepEqual(url, expectedOutput);
    assert.strictEqual(Object.keys(urls).length, 5);
  });

  it("should throw an error if userID or userID or longURL is undefined", async () => {
    await addURL().should.be.rejectedWith(Error);
  });
});

describe("deleteURL", () => {
  it("should delete if the owner of url is the authenticated user", async () => {
    const input = {
      key: "abc01",
      userID: "val02",
    };

    await deleteURL(input).should.not.be.rejected;

    assert.strictEqual(Object.keys(urls).length, 4); // It is still 4 because addURL function added 1
  });

  it("should throw an error if someone is deleting the key", async () => {
    const input = {
      key: "abc01",
      userID: "other",
    };

    await deleteURL(input).should.be.rejectedWith(Error);
  });

  it("should throw an error if key or userID or key is undefined", async () => {
    await deleteURL().should.be.rejectedWith(Error);
  });
});
