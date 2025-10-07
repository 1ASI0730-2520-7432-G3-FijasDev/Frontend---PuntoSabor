
export default [
    {
        path: '/plans',
        name: 'plans',
        component: () => import('./views/plans.view.vue'),
        meta: { title: 'Planes de membresía' }
    }
];
