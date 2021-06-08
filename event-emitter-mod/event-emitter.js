export default class EventEmitter {
    #events = new Map();
    maxListeners = 10;
    constructor(options) {
        if (options?.maxListeners) {
            this.maxListeners = options.maxListeners;
        }
    }
    on = (event, listener) => this.addListener(event, listener);
    emit(event, args) {
        let exists = this.exists(event);
        if (!exists)
            throw new Error('That event does not exist');
        let listeners = this.listeners(event);
        let triggerWithArgs = this.triggerCallback(args);
        listeners?.forEach(triggerWithArgs);
        return true;
    }
    exists(event) {
        return this.#events.has(event);
    }
    listeners(event) {
        let exists = this.exists(event);
        if (!exists)
            return [];
        return this.#events.get(event);
    }
    addListener(event, listener) {
        let exists = this.exists(event);
        try {
            if (!exists) {
                this.#events.set(event, [listener]);
                return true;
            }
            else {
                let listeners = this.listeners(event);
                if (listeners?.length && listeners.length >= this.maxListeners)
                    return false;
                listeners?.push(listener);
                this.#events.set(event, listeners);
                return true;
            }
        }
        catch (err) {
            return false;
        }
    }
    removeListener(event, listener) {
        let exists = this.exists(event);
        if (!exists) {
            return null;
        }
        let listeners = this.listeners(event);
        if (!listeners?.length)
            return false;
        this.#events.set(event, listeners?.filter(x => x !== listener));
        return true;
    }
    triggerCallback(args) {
        return (cb) => {
            try {
                cb(args);
            }
            catch (err) {
                throw new Error(err);
            }
        };
    }
}
