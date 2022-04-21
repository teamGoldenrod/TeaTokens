/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Product },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Product routes", () => {
  beforeEach(async () => {
    // await seed();
  });

  describe("/api/products/", () => {
    beforeEach(async () => {
      const boba = await Product.create({
        name: "Boba",
        price: 79.99,
      });

      const jasmine = await Product.create({
        name: "Jasmine Tea",
        price: 8.99,
      });
    });

    it("GET /api/products", async () => {
      const res = await request(app).get("/api/products").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body[0].name).to.equal("Boba");
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
