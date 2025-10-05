export default [
    { path: '/auth', component: () => import('./views/login.view.vue') },
    { path: '/register', component: () => import('./views/register.view.vue') },
    { path: '/role', component: () => import('./views/role-select.view.vue') }
];
