import { api } from '@/shared/infrastructure/base-api';
export const MembershipsRepository = { list(){ return api('/plans'); } };
