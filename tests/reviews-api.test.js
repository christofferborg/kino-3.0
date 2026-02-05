import { jest } from '@jest/globals';
import express from "express";
import request from "supertest";
import reviewsRouter from "../src/api/reviews-api.js";

global.fetch = jest.fn(); // global mock av fetch

const app = express();
app.use("/api/reviews", reviewsRouter);

describe("POST /api/reviews", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("skickar recensionen om alla fält är korrekt ifyllda", async () => {
    const mockData = {
      data: { author: "Orvar", rating: 4, comment: "Bra film", movie: 4, createdAt: "now", updatedAt: "now", verified: null }
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const response = await request(app)
      .post("/api/reviews")
      .send({ name: "Orvar", rating: 4, comment: "Bra film", movie: 4 })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    // jämför bara de viktiga fälten
    expect(response.body.review).toMatchObject({
      author: "Orvar",
      rating: 4,
      comment: "Bra film",
      movie: 4
    });
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

  it("viderför fel från Plankton API korrekt", async () => {
    const mockError = {
      data: null,
      error: { status: 400, name: "BadRequestError", message: "Missing movie" }
    };

    fetch.mockResolvedValueOnce({
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
    fetch.mockRejectedValueOnce(new Error("Serverfel"));

    const response = await request(app)
      .post("/api/reviews")
      .send({ name: "Orvar", rating: 4, comment: "Bra film", movie: 4 })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Kunde inte skicka recensionen");
  });

});
