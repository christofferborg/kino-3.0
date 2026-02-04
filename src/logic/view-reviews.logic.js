
import { getReviewsToView } from "../cms/cms.client.js";

export async function fetchReviewsToViewFromCMS(movieId) { 

  const reviewsData = await getReviewsToView(movieId);
  const reviews = reviewsData.map((review) => ({
    id: review.id,
    ...review.attributes,
  }));
  return reviews;
 }

