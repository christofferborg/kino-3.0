import { isEnoughReviews } from "../src/logic/ratingCalculator.js";
import { getAverage } from "../src/logic/ratingCalculator.js";
import { calculateRating } from "../src/logic/ratingCalculator.js";

describe("Container of all tests", () => {
  test("should return true if list has 5 items", () => {
    const items = [1, 2, 3, 4, 5];
    const result = isEnoughReviews(items);
    expect(result).toBe(true);
  });
  test("should return false if list has less than 5 items", () => {
    const items = [1, 2, 3];
    const result = isEnoughReviews(items);
    expect(result).toBe(false);
  });
  test("should return the correct average of an array of numbers", () => {
    const data = [4, 5, 6];
    const result = getAverage(data);
    expect(result).toBe(5);
  });
  test("should return average from CMS reviews when there are 5 or more", () => {
    const reviews = [
      { attributes: { rating: 2 } },
      { attributes: { rating: 4 } },
      { attributes: { rating: 6 } },
      { attributes: { rating: 8 } },
      { attributes: { rating: 10 } },
    ];
    const fakeImdbRating = 8.0;
    const result = calculateRating(reviews, fakeImdbRating);
    expect(result).toBe(6);
  });
  test("Should return IMDb rating if less than 5 reviews.", () => {
    const reviews = [
      { attributes: { rating: 2 } },
      { attributes: { rating: 4 } },
      { attributes: { rating: 6 } },
    ];
    const fakeImdbRating = 8.0;
    const result = calculateRating(reviews, fakeImdbRating);
    expect(result).toBe(8.0);
  })
});
