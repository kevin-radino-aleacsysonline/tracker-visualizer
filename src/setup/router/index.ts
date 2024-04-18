import { createRouter, createWebHistory } from 'vue-router';
import ViewTemplate from '../../components/ViewTemplate.vue';

const routes = [
    {
        path: '/',
        redirect: '/environments',
    },
    {
        path: '/environments',
        name: 'Environments',
        component: ViewTemplate,
        props: {
            dataType: 'environments',
        },
    },
    {
        path: '/projects',
        name: 'Projects',
        component: ViewTemplate,
        props: {
            dataType: 'projects',
        },
    },
    {
        path: '/updates',
        name: 'Updates',
        component: ViewTemplate,
        props: {
            dataType: 'updates',
        },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
