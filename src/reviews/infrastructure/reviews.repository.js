import { api } from "../../shared/infrastructure/base-api.js";
export const ReviewsRepository = { list(){ return api('/reviews'); } };
