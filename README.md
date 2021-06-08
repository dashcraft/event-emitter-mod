
# Event Emitter Mod
This is an event emitter utility lib for working in the [Moddable SDK](https://www.moddable.com/).
This implements a low brow solution that should work for small event driven applications.

## Installation
`git clone https://github.com/dashcraft/event-emitter-mod.git` or `git clone git@github.com:dashcraft/event-emitter-mod.git`
`cd event-emitter-mod && yarn install`
`yarn build`

Copy the `/event-emitter-mod` folder into your moddable sdk project,
then add the event-emitter-mod package to your projects manifest.json includes:

`"./event-emitter-mod/manifest.json"`

## Usage
First import the primary package
`import  EventEmitter  from  'event-emitter-mod'`
Afterwards, globally or internally you can create a new event emitter...

```
let eventEmitter = new EventEmitter()
eventEmitter.addListener('test', function someCallback(data) {
    trace('data', data)
})

// then you can call...
eventEmitter.emit('test', "Hello world")

// expect a console.log of
"Hello world"
```

## Todo
 - [ ] Tests, tests, more tests
 - [ ] Test memory consumption
 - [ ] Double check with moddable best practices
 
