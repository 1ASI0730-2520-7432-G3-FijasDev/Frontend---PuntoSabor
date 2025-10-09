// src/reviews/reviews-routes.js
export default [
    {
        path: '/reviews',
        component: () => import('./presentation/views/reviews.view.vue')
    }
];
