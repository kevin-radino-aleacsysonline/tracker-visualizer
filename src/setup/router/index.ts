import _ from 'lodash';
import { createRouter, createWebHistory } from 'vue-router';
import { DataType, QueryInfoType } from '../../types';
import { eventBus } from '../../events';
import ViewTemplate from '../../components/ViewTemplate.vue';
import FocusView from '../../components/FocusView.vue';

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
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    // if (to.name === from.name) {
    // if (to.query !== from.query) {
    const gained = _.difference(_.keys(to.query), _.keys(from.query));
    const lost = _.difference(_.keys(from.query), _.keys(to.query));
    emitQueryChange(lost, from.query, true);
    emitQueryChange(gained, to.query);
    // TODO: When none gained and none lost => m.a.w. cluster-namespace_registry -> registry, same amount of queries

    // }
    // }
});

function emitQueryChange(arr: string[], query: any, remove = false): void {
    if (arr.length <= 0) {
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const type = arr[i] as QueryInfoType;
        if (type) {
            console.error(type, query[type], query, remove);
            eventBus.emit('onQueryChange', { type, data: query[type], remove });
        }
    }
}

export default router;
