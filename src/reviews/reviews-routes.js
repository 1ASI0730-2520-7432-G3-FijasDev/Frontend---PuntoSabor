// src/reviews/reviews-routes.js
export default [
    {
        path: '/huariques/:huariqueId/reviews/new',
        name: 'review-new',
        component: () => import('./presentation/views/review-new.view.vue'),
        meta: { title: 'Nueva reseña' }
    },
    {
        path: '/huariques/:huariqueId/reviews',
        name: 'reviews',
        component: () => import('./presentation/views/reviews.view.vue'),
        meta: { title: 'Reseñas' }
    }
];
