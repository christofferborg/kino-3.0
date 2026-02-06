import request from "supertest";
import app from "../app.js";

describe("JWT-skydd för reviews", () => {
  test("kan inte skapa recension utan JWT", async () => {
    const res = await request(app)
      .post("/api/reviews")
      .send({
        name: "Test",
        rating: 5,
        comment: "Bra film",
        movie: 1
      });

    expect(res.status).toBe(401);
  });
});