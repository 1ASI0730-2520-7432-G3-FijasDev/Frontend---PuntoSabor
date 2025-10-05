import { AuthRepository } from '../infrastructure/auth.repository.js';

export async function registerUseCase({ name, email }) {
    const created = await AuthRepository.register({ name, email });
    localStorage.setItem('ps-user', JSON.stringify(created));
    return created;
}
