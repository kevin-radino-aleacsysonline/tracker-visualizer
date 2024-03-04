import { createRouter, createWebHistory } from 'vue-router';
import Environments from '../../components/views/EnvironmentsView.vue';
import Projects from '../../components/views/ProjectsView.vue';
import Updates from '../../components/views/UpdatesView.vue';

const routes = [
    {
        path: '/',
        redirect: '/environments/all',
    },
    {
        path: '/environments/:id*',
        name: 'Environments',
        component: Environments,
    },
    {
        path: '/projects/:id*',
        name: 'Projects',
        component: Projects,
    },
    {
        path: '/updates/:id*',
        name: 'Updates',
        component: Updates,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
