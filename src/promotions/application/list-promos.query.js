import { PromosRepository } from '../infrastructure/promos.repository.js';
export const listPromosQuery = () => PromosRepository.list();
