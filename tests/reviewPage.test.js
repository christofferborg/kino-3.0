/* This file contains tests for the pagination 
functionality on the view reviews page */

import { paginateReviews} from "../src/logic/view-reviews.logic.js";

describe("Pagination tests for review page", () => {
  test("returns max 5 reviews per page", () => {    

 // Sample reviews data with 12 reviews
const reviews = [
      { id: 1 }, { id: 2 }, { id: 3 },
      { id: 4 }, { id: 5 }, { id: 6 },
      { id: 7 }, { id: 10 }, { id: 12 }, 
      { id: 22 }, { id: 30 },{ id: 15 }
    ];

    const pageSize = 5;

    const page1 = paginateReviews(reviews, 1, pageSize);
    const page2 = paginateReviews(reviews, 2, pageSize);
    const page3 = paginateReviews(reviews, 3, pageSize);
    

    expect(page1.data.length).toBeLessThanOrEqual(5);
    expect(page2.data.length).toBeLessThanOrEqual(5);
    expect(page3.data.length).toBeLessThanOrEqual(5);
    
  });
});