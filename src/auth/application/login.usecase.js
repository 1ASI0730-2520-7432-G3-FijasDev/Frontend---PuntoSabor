import { AuthRepository } from '../infrastructure/auth.repository.js';

export async function loginUseCase(email) {
    const user = await AuthRepository.login(email);
    if (!user) throw new Error('Usuario no encontrado');
    localStorage.setItem('ps-user', JSON.stringify(user));
    return user;
}
