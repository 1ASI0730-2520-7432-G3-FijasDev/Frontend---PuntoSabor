import { api } from '@/shared/infrastructure/base-api';

export const AuthRepository = {
    async login(email) {
        const users = await api(`/users?email=${encodeURIComponent(email)}`);
        return users[0] || null;
    },
    async register(payload) {
        return api('/users', { method: 'POST', body: JSON.stringify(payload) });
    },
    async findByEmail(email) {
        const users = await api(`/users?email=${encodeURIComponent(email)}`);
        return users[0] || null;
    },
    async updatePassword(userId, userData) {
        return api(`/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(userData)
        });
    }
};
