/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { User },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

xdescribe("User routes", () => {
  beforeEach(async () => {
    // await seed();
    return User.create({
      username: "goldenrod",
      password: "admin",
      email: "goldenrod@fullstack.com",
      role: "admin",
    });
  });

  describe("/api/users/", () => {
    it("GET /api/users", async () => {
      const res = await request(app).get("/api/users").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body[0].username).to.equal("goldenrod");
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
