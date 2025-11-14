/**
 * Caso de uso: Crear reseña con validación de contenido
 * Implementa el requisito: Detección automática de contenido inapropiado
 */

import { ReviewsRepository } from '../infrastructure/reviews.repository.js';
import { Review } from '../domain/model/reviews.entity.js';
import { ContentModerationService } from '../domain/services/content-moderation.service.js';

export async function createReviewUseCase({ huariqueId, userId, rating, comment }) {
    // Validación básica de datos obligatorios
    if (!huariqueId || !rating || !comment) {
        throw new Error('La reseña debe incluir huarique, puntuación y comentario');
    }

    // 1) Validar contenido del comentario
    const validation = ContentModerationService.validateContent(comment);

    // Soporta tanto isAppropriate como isApropriate
    const isAppropriate =
        (typeof validation?.isAppropriate !== 'undefined'
            ? validation.isAppropriate
            : validation?.isApropriate) ?? true;

    if (!isAppropriate) {
        // Marcar reseña para revisión manual
        return {
            success: false,
            status: 'blocked',
            message: validation?.reason ?? 'Se detectó contenido inapropiado en la reseña',
            requiresReview: true,
            originalContent: comment
        };
    }

    // 2) Sanitizar contenido
    const sanitizedComment = typeof ContentModerationService.sanitizeContent === 'function'
        ? ContentModerationService.sanitizeContent(comment)
        : comment;

    // 3) Crear entidad de dominio
    const review = new Review({
        huariqueId,
        userId,
        rating,
        comment: sanitizedComment
    });

    // 4) Persistir usando el repositorio + manejo de error
    try {
        const result = await ReviewsRepository.create(review);
        return {
            success: true,
            status: 'approved',
            message: 'Reseña publicada exitosamente',
            review: result
        };
    } catch (error) {
        throw new Error(`Error al crear reseña: ${error.message}`);
    }
}
