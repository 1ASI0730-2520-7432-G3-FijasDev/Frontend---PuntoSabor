export default [
    { path: '/categories', component: () => import('./views/categories.view.vue') },
    { path: '/results', component: () => import('./views/results.view.vue') },
    { path: '/map', component: () => import('./views/map.view.vue') }
];
