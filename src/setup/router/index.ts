import { createRouter, createWebHistory } from 'vue-router';
import ViewTemplate from '../../components/ViewTemplate.vue';
import FocusView from '../../components/FocusView.vue';
import { DataType } from '../../types/dataTypes';

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
            dataType: DataType.Environments,
        },
    },
    {
        path: '/projects',
        name: 'Projects',
        component: ViewTemplate,
        props: {
            dataType: DataType.Projects,
        },
    },
    {
        path: '/updates',
        name: 'Updates',
        component: ViewTemplate,
        props: {
            dataType: DataType.Updates,
        },
    },
    {
        path: '/focus',
        name: 'Focus',
        component: FocusView,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
