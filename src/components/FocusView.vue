<template>
    <v-container v-if="item !== null && item !== undefined">
        <template v-for="key in orderedEntries" :key>
            <component v-if="key in computedComponents" :is="computedComponents[key].view" v-bind="computedComponents[key].props">
                <template #title> {{ _.capitalize(key) }} </template>
            </component>
            <v-label v-else>{{ key }}, </v-label>
        </template>
    </v-container>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { onMounted, Ref, computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DataType, IIdentifiable, QueryInfoType, BreadcrumbsItemSlotType } from '../types';
import { fetchAllData } from '../controllers';
import { FocusViewId, FocusViewDescription, FocusViewReference, FocusViewStringArray } from '../components';
import { FOCUSSED_ITEM } from '../constants';

var item: Ref<IIdentifiable | undefined> = ref(undefined);
var type: DataType;
const route = useRoute();
const router = useRouter();

// TODO: loading and skeleton loader for this view

onMounted(async () => {
    await router.isReady();
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

    if (!id && tempItem) {
        // loading previously visited data
        setItem(tempItem);
        return;
    }
    console.error('nothing found');
});

// TODO: link in Environment, repository in Project
const desiredOrder = ['id', 'description', 'projects', 'updates', 'environments', 'versions', 'commits'];

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
});

function getReferenceObject(prop: string, dataType?: DataType): { view: any; props: any } {
    return {
        view: computed(() => FocusViewReference),
        props: computed(() => {
            return { items: prop in item.value! ? (item.value as any)[prop] : ['test'], dataType };
        }),
    };
}

function getStringArrayObject(prop: string): { view: any; props: any } {
    return {
        view: computed(() => FocusViewStringArray),
        props: computed(() => {
            return { items: prop in item.value! ? (item.value as any)[prop] : ['test'] };
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
</script>
