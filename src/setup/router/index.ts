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
    if (to.query !== from.query) {
        const keysGained = getChangedKeys(to.query, from.query);
        const keysLost = getChangedKeys(from.query, to.query);
        // console.error('gained', keysGained);
        // console.error('lost', keysLost);
        if ((keysGained.length > 0 && keysLost.length <= 0) || keysGained.length === keysLost.length) {
            // console.error('new or update');
            emitQueryAddOrRemove(keysGained, to.query);
        }

        if (keysGained.length <= 0 && keysLost.length > 0) {
            // console.error('remove');
            emitQueryAddOrRemove(keysLost, from.query, true);
        }

        if (keysGained.length > 0 && keysLost.length > 0 && _.union(keysGained, keysLost).length === keysGained.length + keysLost.length) {
            // console.error('gained and lost');
            emitQueryAddOrRemove(keysGained, to.query);
            emitQueryAddOrRemove(keysLost, from.query, true);
        }
    }
});

function getChangedKeys(query1: any, query2: any): string[] {
    return _.reduce(
        query1,
        (result: string[], value, key) => {
            if (!_.isEqual(value, query2[key])) {
                result.push(key);
            }
            return result;
        },
        []
    );
}

function emitQueryAddOrRemove(arr: string[], query: any, remove = false): void {
    if (arr.length <= 0) {
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const type = arr[i] as QueryInfoType;
        if (type) {
            // console.error(type, query[type], query, remove);
            eventBus.emit('onQueryChange', { type, data: query[type], remove });
        }
    }
}

export default router;
