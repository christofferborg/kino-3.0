import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/cms/cms.client.js', () => ({
  getReviewsByMovieId: jest.fn(),
}));

const cmsModule = await import('../src/cms/cms.client.js');
const { getReviewsByMovieId } = cmsModule;

const { calculateRating } = await import('../src/logic/ratingCalculator.js');

const mockReviews = [
  { attributes: { comment: "Good", rating: 8, author: "A", verified: true } },
  { attributes: { comment: "Bad", rating: 3, author: "B", verified: false } },
  { attributes: { comment: "Okay", rating: 5, author: "C", verified: null } },
];

describe("Verified reviews", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
    getReviewsByMovieId.mockResolvedValue(mockReviews);
  });

  test("returns only verified reviews", async () => {
    const reviews = await getReviewsByMovieId(1);
    const filtered = reviews.filter(r => r.attributes.verified === true);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].attributes.comment).toBe("Good");
  });

  test("calculates rating using only verified reviews", async () => {
    const reviews = await getReviewsByMovieId(1);
    const filtered = reviews.filter(r => r.attributes.verified === true);

    const finalRating = calculateRating(filtered, 8); //imdb rating is 8
    expect(finalRating).toBeDefined();
  });
});