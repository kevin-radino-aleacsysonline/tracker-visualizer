<template>
    <v-container v-if="!isLoading && item !== null && item !== undefined">
        <template v-for="key in orderedEntries" :key>
            <component v-if="key in computedComponents" :is="computedComponents[key].view" v-bind="computedComponents[key].props">
                <template #title> {{ _.capitalize(key) }} </template>
            </component>
        </template>
    </v-container>
    <v-container v-else>
        <focus-view-loading-component v-if="isLoading"></focus-view-loading-component>
        <v-label v-else>No such entry</v-label>
    </v-container>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { onMounted, onUnmounted, Ref, computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DataType, IIdentifiable, QueryInfoType, BreadcrumbsItemSlotType } from '../types';
import { fetchAllData, formatDate } from '../controllers';
import { FocusViewId, FocusViewObject, FocusViewDescription, FocusViewReference, FocusViewStringArray, FocusViewLoadingComponent, FocusViewTimestampVersion } from '../components';
import { FOCUSSED_ITEM } from '../constants';
import { eventBus, OnQueryChangedArgs } from '../events';

var item: Ref<IIdentifiable | undefined> = ref(undefined);
var type: DataType;
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);

eventBus.on('onQueryChange', onQueryChangeHandler);

onMounted(async () => {
    isLoading.value = true;
    await router.isReady();
    await initializeView();
    isLoading.value = false;
});

onUnmounted(() => {
    eventBus.off('onQueryChange', onQueryChangeHandler);
});

// TODO: link in Environment, repository in Project, link in Update
const desiredOrder = ['id', 'description', 'projects', 'updates', 'environments', 'timestamp', 'versions', 'commits', 'version', 'environment', 'project', 'output', 'git'];

const orderedEntries = computed(() => {
    if (!item.value) {
        return [];
    }
    const orderedKeys = desiredOrder.filter((key) => key in item.value!);
    const unorderedKeys = Object.keys(item.value).filter((key) => !orderedKeys.includes(key));
    return [...orderedKeys, ...unorderedKeys];
});

const computedComponents: Record<string, any> = reactive({
    id: {
        view: computed(() => FocusViewId),
        props: computed(() => {
            return { items: getIdBreadcrumbs() };
        }),
    },
    description: {
        view: computed(() => FocusViewDescription),
        props: computed(() => {
            return { description: 'description' in item.value! ? (item.value.description as string) : undefined };
        }),
    },
    projects: getReferenceObject('projects', DataType.Projects),
    updates: getReferenceObject('updates', DataType.Updates),
    environments: getReferenceObject('environments', DataType.Environments),
    versions: getStringArrayObject('versions'),
    commits: getStringArrayObject('commits'),
    environment: getReferenceObject('environment', DataType.Environments),
    project: getReferenceObject('project', DataType.Projects),
    output: getObject('output'),
    git: getObject('git'),
    timestamp: {
        view: computed(() => FocusViewTimestampVersion),
        props: computed(() => {
            return { data: formatDate(new Date((item.value as any)['timestamp'])), icon: 'mdi-clock-time-four-outline' };
        }),
    },
    version: {
        view: computed(() => FocusViewTimestampVersion),
        props: computed(() => {
            return { data: (item.value as any)['version'], icon: 'mdi-tag-outline' };
        }),
    },
});

async function initializeView(): Promise<void> {
    const id = route.query[QueryInfoType.id]?.toString();
    const itemString = localStorage.getItem(FOCUSSED_ITEM);
    var tempItem: IIdentifiable | undefined = undefined;
    tempItem = JSON.parse(itemString ?? '');

    if (id && tempItem?.id === id) {
        // loading data stored from other view
        setItem(tempItem);
        return;
    }

    const map = await fetchAllData();
    if (id && map.has(id)) {
        // loading data when not coming from other view
        setItem(map.get(id));
        return;
    }

    if (id && !map.has(id)) {
        // loading previously visited data
        setItem(undefined);
        return;
    }
    console.error('nothing found');
}

function getReferenceObject(prop: string, dataType?: DataType): { view: any; props: any } {
    return {
        view: computed(() => FocusViewReference),
        props: computed(() => {
            return { items: getItems(prop), dataType };
        }),
    };
}

function getStringArrayObject(prop: string): { view: any; props: any } {
    return {
        view: computed(() => FocusViewStringArray),
        props: computed(() => {
            return { items: getItems(prop) };
        }),
    };
}

function getItems(prop: string): any[] {
    let items = prop in item.value! ? (item.value as any)[prop] : ['undefined'];
    if (!Array.isArray(items)) {
        items = [items];
    }
    return items;
}

function getObject(prop: string): { view: any; props: any } {
    return {
        view: computed(() => FocusViewObject),
        props: computed(() => {
            return { object: (item.value as any)[prop] };
        }),
    };
}

function getIdBreadcrumbs(): BreadcrumbsItemSlotType[] {
    if (!item.value) {
        return [
            {
                title: 'no data',
            },
        ];
    }

    const crumbs: BreadcrumbsItemSlotType[] = [{ title: type.toString().toLowerCase() }];
    if ('type' in item.value) {
        crumbs.push({ title: (item.value.type as string).toLowerCase() });
    }

    if (item.value.name) {
        // if name
        crumbs.push({ title: item.value.name.toLowerCase() });
    } else {
        // else id
        crumbs.push({ title: item.value.id.toLowerCase() });
    }

    return crumbs;
}

function setItem(i: any): void {
    item.value = i;
    if (item.value) {
        type = getType(item.value);
    }
}

function getType(item: IIdentifiable): DataType {
    if ('git' in item) {
        return DataType.Updates;
    }

    if ('projects' in item) {
        return DataType.Environments;
    }

    return DataType.Projects;
}

async function onQueryChangeHandler(args: OnQueryChangedArgs): Promise<void> {
    isLoading.value = true;
    const id = args.data;
    const map = await fetchAllData();
    if (id && map.has(id)) {
        // loading data when not coming from other view
        setItem(map.get(id));
    } else {
        setItem(undefined);
    }
    isLoading.value = false;
}
</script>
