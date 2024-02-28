import { createRouter, createWebHistory } from 'vue-router';
import Environments from '../../components/views/EnvironmentsView.vue';
import Projects from '../../components/views/ProjectsView.vue';
import Updates from '../../components/views/UpdatesView.vue';
import Home from '../../components/views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        // props: {
        //     msg: 'Prop message',
        // },
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
    {
        path: '/environments/:id*',
        name: 'Environments',
        component: Environments,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
