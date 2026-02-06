import { calculatePopularMovies } from "../src/logic/popularMovies.js";

test("exkluderar filmer utan reviews senaste 30 dagarna", () => {
  const data = [
    {
      id: 1,
      title: "Old movie",
      reviews: [
        {
          attributes: {
            rating: 5,
            createdAt: "2020-01-01T00:00:00.000Z",
          },
        },
      ],
    },
  ];

  const result = calculatePopularMovies(data);
  expect(result).toHaveLength(0);
});

test("returnerar max fem filmer sorterade på betyg", () => {
  const now = new Date().toISOString();

  const data = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    title: `Movie ${i}`,
    reviews: [
      {
        attributes: {
          rating: i,
          createdAt: now,
        },
      },
    ],
  }));

  const result = calculatePopularMovies(data);

  expect(result).toHaveLength(5);
  expect(result[0].averageRating).toBe(6);
});
