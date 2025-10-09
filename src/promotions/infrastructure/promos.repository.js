import { api } from '@/shared/infrastructure/base-api';
export const PromosRepository = { list(){ return api('/promos'); } };
