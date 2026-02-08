import request from "supertest";
import app from "../app.js";
import { jest } from "@jest/globals";

global.fetch = jest.fn();

describe("IMDb provider switch", () => {
  afterEach(() => {
    fetch.mockClear();
  });

  test("OMDB by default", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        data: [],
      }),
    });
    fetch.mockResolvedValueOnce({
      json: async () => ({
        data: { attributes: { imdbId: "tt1234567" } },
      }),
    });
    fetch.mockResolvedValueOnce({
      json: async () => ({
        imdbRating: "7.8",
      }),
    });

    await request(app).get("/api/movies/1/rating");

    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("omdbapi.com"),
    );
  });

  test("uses imdbapi when source=imdbapi", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        data: [],
      }),
    });
    fetch.mockResolvedValueOnce({
      json: async () => ({
        data: { attributes: { imdbId: "tt1234567" } },
      }),
    });
    fetch.mockResolvedValueOnce({
      json: async () => ({
        imDbRating: "8.1",
      }),
    });

    await request(app).get("/api/movies/1/rating?source=imdbapi");

    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("imdbapi.net"),
    );
  });
});
