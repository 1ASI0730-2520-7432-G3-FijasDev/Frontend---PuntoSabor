export default [
    { path: '/categories', component: () => import('./views/categories.view.vue') },
    { path: '/results', component: () => import('./views/results.view.vue') },
    { path: '/map', component: () => import('./views/map.view.vue') },

    {
        path: '/owner/huariques/new',
        name: 'owner-huarique-new',
        component: () => import('./views/owner-huarique-new.view.vue'),
        meta: { requiresOwner: true, title: 'Registrar huarique' }
    },
    {
        path: '/owner/huariques/:id/edit',
        name: 'owner-huarique-edit',
        component: () => import('./views/owner-huarique-edit.view.vue'),
        meta: { requiresOwner: true, title: 'Editar huarique' }
    }
];
