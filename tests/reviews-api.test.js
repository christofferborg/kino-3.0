// tests/reviews-api.test.js
import { jest } from "@jest/globals";

// Mocka auth – JWT testas i annan fil
jest.unstable_mockModule("../src/middleware/auth.js", () => ({
  verifyToken: (req, res, next) => next()
}));

import request from "supertest";
import express from "express";

const { default: reviewsRouter } = await import("../src/api/reviews-api.js");
const app = express();
app.use("/api/reviews", reviewsRouter);

describe("POST /api/reviews", () => {
  let originalLog, originalError;

  beforeEach(() => {
    originalLog = console.log;
    originalError = console.error;
    console.log = jest.fn();
    console.error = jest.fn();

    
    global.fetch = jest.fn();
  });

  afterEach(() => {
    console.log = originalLog;
    console.error = originalError;
    global.fetch = undefined;
  });

  it("skickar recensionen om alla fält är korrekt ifyllda", async () => {
    const mockData = {
      data: {
        author: "Orvar",
        rating: 4,
        comment: "Bra film",
        movie: 4,
        createdAt: "now",
        updatedAt: "now",
        verified: null
      }
    };

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const response = await request(app)
      .post("/api/reviews")
      .send({ name: "Orvar", rating: 4, comment: "Bra film", movie: 4 })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.review).toEqual(mockData.data);
  });

  it("returnerar 400 om något fält saknas", async () => {
    const response = await request(app)
      .post("/api/reviews")
      .send({ name: "Orvar", rating: 4, comment: "" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toMatch(/Alla fält krävs/);
  });

  it("returnerar 400 om rating är utanför 1-5", async () => {
    const response = await request(app)
      .post("/api/reviews")
      .send({ name: "Orvar", rating: 6, comment: "Test", movie: 4 })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toMatch(/Rating måste vara ett nummer mellan 1 och 5/);
  });

  it("returnerar 400 om rating inte är ett nummer", async () => {
    const response = await request(app)
      .post("/api/reviews")
      .send({ name: "Orvar", rating: "3", comment: "Testkommentar", movie: 4 })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toMatch(/Rating måste vara ett nummer mellan 1 och 5/);
  });

  it("vidarebefodra fel från Plankton API korrekt", async () => {
    const mockError = {
      data: null,
      error: { status: 400, name: "BadRequestError", message: "Missing movie" }
    };

    global.fetch.mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => mockError
    });

    const response = await request(app)
      .post("/api/reviews")
      .send({ name: "Orvar", rating: 4, comment: "Test", movie: null })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Missing movie");
  });

  it("returnerar 500 vid serverfel", async () => {
    global.fetch.mockRejectedValue(new Error("Serverfel"));

    const response = await request(app)
      .post("/api/reviews")
      .send({ name: "Orvar", rating: 4, comment: "Bra film", movie: 4 })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Kunde inte skicka recensionen");
  });
});
