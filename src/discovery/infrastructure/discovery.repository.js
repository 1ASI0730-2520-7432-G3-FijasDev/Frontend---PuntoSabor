import { api } from '@/shared/infrastructure/base-api';

export const DiscoveryRepository = {
    listCategories(){ return api('/categories'); },
    search(q){ return api(`/huariques?q=${encodeURIComponent(q)}`); },
    nearYou(){ return api('/huariques?near=true'); }
};
