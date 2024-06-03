import { OnFilterChangedArgs, OnQueryChangedArgs, OnQueryResetArgs, OnViewLoadingArgs, OnViewUpdateArgs } from './eventTypes';

export interface EventMap {
    onQueryChange: OnQueryChangedArgs;
    onQueryReset: OnQueryResetArgs;
    onViewUpdate: OnViewUpdateArgs;
    onViewLoading: OnViewLoadingArgs;
    onFilterChanged: OnFilterChangedArgs;
}

type EventHandler<T = any> = (payload: T) => void;

class EventBus {
    private events: { [K in keyof EventMap]?: EventHandler<EventMap[K]>[] } = {};

    on<K extends keyof EventMap>(eventType: K, handler: EventHandler<EventMap[K]>): void {
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        this.events[eventType]!.push(handler);
    }

    off<K extends keyof EventMap>(eventType: K, handler: EventHandler<EventMap[K]>): void {
        const handlers = this.events[eventType];
        if (!handlers) return;
        const index = handlers.indexOf(handler);
        if (index !== -1) {
            handlers.splice(index, 1);
        }
    }

    emit<K extends keyof EventMap>(eventType: K, payload: EventMap[K]): void {
        const handlers = this.events[eventType];
        if (!handlers) return;
        handlers.forEach((handler) => handler(payload));
    }
}

export const eventBus = new EventBus();
