import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('./shared/presentations/views/home.view.vue');
const NotFound = () => import('./shared/presentations/views/page-not-found.view.vue');

// contextos
const AuthRoutes = () => import('./auth/presentation/auth-routes.js');
const DiscoveryRoutes = () => import('./discovery/presentation/discovery-routes.js');
const PromotionsRoutes = () => import('./promotions/presentation/promotions-routes.js');
const ReviewsRoutes = () => import('./reviews/reviews-routes.js');
const MembershipsRoutes = () => import('./memberships/presentation/memberships-routes.js');
const ContactRoutes = () => import('./contact/presentation/contact-routes.js');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        // Cargamos las rutas contextuales en tiempo de ejecucion
        { path: '/auth', component: () => import('./auth/presentation/views/login.view.vue') },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
    ]
});

(async () => {
    // inyectando rutas de cada contexto
    const ctxs = [
        (await AuthRoutes()).default,
        (await DiscoveryRoutes()).default,
        (await PromotionsRoutes()).default,
        (await ReviewsRoutes()).default,
        (await MembershipsRoutes()).default,
        (await ContactRoutes()).default
    ];
    ctxs.flat().forEach(r => router.addRoute(r));
})();

export default router;
