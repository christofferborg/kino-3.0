import request from "supertest";
import express from "express";
import movieScreeningsRoute from "../api/movieScreenings.route.js";
import * as cmsClient from "../cms/cms.client.js";

jest.mock("../cms/cms.client.js");

const app = express();
app.use(express.json());
app.use("/api", movieScreeningsRoute);

describe("GET /api/movies/:movieId/screenings", () => {
  test("returns only upcoming screenings for a movie", async () => {
    const now = Date.now();

    
    cmsClient.getScreenings.mockResolvedValue([
      {
        id: 1,
        start_time: new Date(now - 60_000).toISOString() 
      },
      {
        id: 2,
        start_time: new Date(now + 60_000).toISOString() 
      }
    ]);

    const response = await request(app)
      .get("/api/movies/12/screenings")
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(2);
  });
});
