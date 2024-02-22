import { createRouter, createWebHistory } from 'vue-router';
import Environments from '../../components/Environments.vue';
import Projects from '../../components/Projects.vue';
import Updates from '../../components/Updates.vue';
import Home from '../../components/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: {
            msg: 'Prop message',
        },
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
    },
    {
        path: '/updates',
        name: 'Updates',
        component: Updates,
    },
    {
        path: '/environments',
        name: 'Environments',
        component: Environments,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
});

export default router;
