import { createRouter, createWebHistory } from 'vue-router';
import { getSession } from '@/auth/application/get-session.query';

const Home = () => import('./shared/presentations/views/home.view.vue');
const NotFound = () => import('./shared/presentations/views/page-not-found.view.vue');


const AuthRoutes        = () => import('./auth/presentation/auth-routes.js');
const DiscoveryRoutes   = () => import('./discovery/presentation/discovery-routes.js');
const PromotionsRoutes  = () => import('./promotions/presentation/promotions-routes.js');
const ReviewsRoutes     = () => import('./reviews/reviews-routes.js');
const MembershipsRoutes = () => import('./memberships/presentation/memberships-routes.js');
const ContactRoutes     = () => import('./contact/presentation/contact-routes.js');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home, meta: { title: 'PuntoSabor' } },

        // Ruta directa a login por si alguien navega manualmente a /auth
        { path: '/auth', component: () => import('./auth/presentation/views/login.view.vue'), meta: { title: 'Sign in' } },

        // 404
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { title: 'Página no encontrada' } }
    ],
    scrollBehavior() { return { top: 0 }; }
});


router.beforeEach(async (to) => {
    if (to.meta?.requiresOwner) {
        try {
            const session = await getSession(); // debe devolver { role: 'owner' | 'explorer' | ... }
            if (!session || session.role !== 'owner') {
                // si no tiene rol válido, redirige al selector de rol
                return { path: '/role' }; // asumiendo que /role existe en auth-routes
            }
        } catch {
            return { path: '/auth' };
        }
    }
    return true;
});


router.afterEach((to) => {
    const base = 'PuntoSabor';
    const title = to.meta?.title ? `${to.meta.title} · ${base}` : base;
    if (typeof document !== 'undefined') document.title = title;
});


(async () => {
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
