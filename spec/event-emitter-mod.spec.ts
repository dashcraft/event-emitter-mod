import EventEmitter from '../src/event-emitter-mod';

describe("Event emitter unit tests", () => {
    it('Should call event listener with data', () => {
        let eventEmitter = new EventEmitter()
        let fakeCb = jest.fn()
        eventEmitter.addListener('test', fakeCb)        

        expect(eventEmitter.listeners('test')).toHaveLength(1)
        let fakeData = {
            data: "test"
        }
        eventEmitter.emit('test', fakeData)

        expect(fakeCb).toHaveBeenCalledTimes(1)
        expect(fakeCb).toHaveBeenCalledWith(fakeData)
    })

    it('Should remove event listeners and that order is not important, only call signature', () => {
        let eventEmitter = new EventEmitter()
        let fakeFn = jest.fn()
        let fakeFn2 = jest.fn()
        function fakeCb(args) {
            fakeFn(args)
        }

        function fakeCb2(args) {
            fakeFn2(args)
        }
        eventEmitter.addListener('test', fakeCb)        
        eventEmitter.addListener('test', fakeCb2)       
        expect(eventEmitter.listeners('test')).toHaveLength(2)
        
        eventEmitter.removeListener('test', fakeCb2)
        expect(eventEmitter.listeners('test')).toHaveLength(1)

        let fakeData = {
            data: "test"
        }
        eventEmitter.emit('test', fakeData)

        expect(fakeFn).toHaveBeenCalledTimes(1)
        expect(fakeFn).toHaveBeenCalledWith(fakeData)

        eventEmitter.addListener('test', fakeCb2)     
        expect(eventEmitter.listeners('test')).toHaveLength(2)
        eventEmitter.emit('test', fakeData)


        expect(fakeFn).toHaveBeenCalledTimes(2)
        expect(fakeFn).toHaveBeenCalledWith(fakeData)
        expect(fakeFn2).toHaveBeenCalledTimes(1)
        expect(fakeFn2).toHaveBeenCalledWith(fakeData)

        eventEmitter.removeListener('test', fakeCb)

        expect(eventEmitter.listeners('test')).toHaveLength(1)

        eventEmitter.emit('test', fakeData)
        expect(fakeFn2).toHaveBeenCalledTimes(2)
        expect(fakeFn2).toHaveBeenCalledWith(fakeData)
    })


    it('Should have max default listeners of 10', () => {
        let eventEmitter = new EventEmitter()
        let fakeFn = jest.fn()
        function fakeCb(args) {
            fakeFn(args)
        }
        for(let i = 0; i < 20; i ++) {
            eventEmitter.addListener('test', fakeCb)        
        }
        expect(eventEmitter.listeners('test')).toHaveLength(10)
    })

    it('Should allow max default to be greater than 10', () => {
        let newMaxListener = 15
        let eventEmitter = new EventEmitter({ maxListeners: newMaxListener})
        let fakeFn = jest.fn()
        function fakeCb(args) {
            fakeFn(args)
        }
        for(let i = 0; i < 20; i ++) {
            eventEmitter.addListener('test', fakeCb)        
        }
        expect(eventEmitter.listeners('test')).toHaveLength(newMaxListener)
    })
})