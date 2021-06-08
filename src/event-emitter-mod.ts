interface IEventEmitter {
    maxListeners: Number,
    on: (event: string, listener: Function) => Boolean | null | undefined,
    emit: (event:string, args: any) => Error | Boolean,
    exists: (event:string) => Boolean,
    listeners: (event:string) => Function[] | null | undefined,
    addListener: (event: string, listener: Function) => Boolean | null | undefined,
    removeListener: (event:string, listener: Function) => Boolean | null | undefined
}

export default class EventEmitter implements IEventEmitter {
    #events: Map<string, Function[] | null | undefined> = new Map()
    maxListeners: Number = 10;
    constructor(options?: any) {
        if(options?.maxListeners) {
            this.maxListeners = options.maxListeners
        }
    }

    on = (event: string, listener: Function) => this.addListener(event, listener)

    emit(event: string, args: any) {
        let exists = this.exists(event)
        if(!exists) throw new Error('That event does not exist')
        let listeners = this.listeners(event)
        let triggerWithArgs = this.triggerCallback(args)
        listeners?.forEach(triggerWithArgs)
        return true
    }

    exists(event: string) {
        return this.#events.has(event)
    }

    listeners(event: string) {
        let exists = this.exists(event)
        if (!exists) return []
        return this.#events.get(event)
    }

    addListener(event: string, listener: Function) {
        let exists = this.exists(event)
        try {
            if (!exists) {
                this.#events.set(event, [listener])
                return true
            } else {
                let listeners = this.listeners(event)
                if(listeners?.length && listeners.length >= this.maxListeners) return false
                listeners?.push(listener)
                this.#events.set(event, listeners)
                return true
            }
        } catch (err) {
            return false
        }
    }


    removeListener(event: string, listener: Function) {
        let exists = this.exists(event)
        if (!exists) {
            return null
        }
        let listeners = this.listeners(event)
        if (!listeners?.length) return false
        this.#events.set(event, listeners?.filter(x => x !== listener))
        return true
    }

    triggerCallback(args: any) {
        return (cb: Function) => {
            try {
                cb(args)
            } catch(err) {
                throw new Error(err)
            }
        }
    }
}