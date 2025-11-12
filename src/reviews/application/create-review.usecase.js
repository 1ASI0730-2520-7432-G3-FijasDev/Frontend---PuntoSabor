import { ReviewsRepository } from '../infrastructure/reviews.repository.js';
import { Review } from '../domain/model/reviews.entity.js';

export async function createReviewUseCase({ huariqueId, userId, rating, comment }) {
    const repo = new ReviewsRepository();
    const review = new Review({ huariqueId, userId, rating, comment });
    return await repo.create(review);
}
