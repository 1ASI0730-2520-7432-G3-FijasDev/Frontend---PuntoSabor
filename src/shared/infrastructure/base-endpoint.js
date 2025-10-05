export const BASE_ENDPOINT = () => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    return url.replace(/\/$/, '');
};
