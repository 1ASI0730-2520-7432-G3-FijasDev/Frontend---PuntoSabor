import { api } from '@/shared/infrastructure/base-api';

export const ReviewsRepository = {
    list() {
        return api('/reviews');
    },

    listByHuarique(huariqueId) {
        const id = Number(huariqueId);
        return api(`/reviews?huariqueId=${id}&_sort=createdAt&_order=desc`);
    },

    async create(payload) {
        const body = {
            ...payload,
            createdAt: new Date().toISOString()
        };
        return api('/reviews', {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }
};
