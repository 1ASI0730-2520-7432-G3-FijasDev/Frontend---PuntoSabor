import { api } from '@/shared/infrastructure/base-api';

export const AuthRepository = {
    async login(email) {
        // json-server: busca usuario por email o crea mock
        const users = await api(`/users?email=${encodeURIComponent(email)}`);
        return users[0] || null;
    },
    async register(payload) {
        return api('/users', { method: 'POST', body: JSON.stringify(payload) });
    }
};
