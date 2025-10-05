import { api } from '@/shared/infrastructure/base-api';
export const ReviewsRepository = { list(){ return api('/reviews'); } };
