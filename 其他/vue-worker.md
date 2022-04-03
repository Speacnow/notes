# VueWorker

> A Vue.js plugin to use webworkers in a simply way.

## Changelog

### **1.2.1**

#### *Highlights:*

- Fix README examples

See full changelog [here](https://github.com/israelss/vue-worker/blob/master/changelog.md#120).

## Why

Create and use [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) can be cumbersome sometimes. This plugin aims to facilitate the use of Web Workers within Vue components. It is a wrapper for [simple-web-worker](https://github.com/israelss/simple-web-worker).

## How to install and use

```js
yarn add vue-worker

// or

npm install vue-worker --save
```

Then add in main.js:

```
import Vue from 'vue'
import VueWorker from 'vue-worker'
Vue.use(VueWorker)
```

That will inject a property into Vue (and pass it to every child component), with a default name of `$worker`, which can be accessed using `this.$worker` inside any Vue component.

You can change that name when registering the plugin:

```
import VueWorker from 'vue-worker'
Vue.use(VueWorker, '$desired-name')
```

## API

### ***NOTICE:***

#### It is not possible to pass as an arg `this` from a Vue Component. You can pass `this.$data` or any variable within `data` or `computed`, though.

### this.$worker.run(*func, [args]?*)

> Where:
>
> - *func* is the function to be runned in worker
> - *[args]* is an optional array of arguments that will be used by *func*

> This method creates a disposable web worker, runs and returns the result of given function    and closes the worker.



This method works like Promise.resolve(), but in another thread.

E.g.:

```js
this.$worker.run(() => 'this.$worker run 1: Function in other thread')
  .then(console.log) // logs 'this.$worker run 1: Function in other thread'
  .catch(console.error) // logs any possible error

this.$worker.run((arg1, arg2) => `this.$worker run 2: ${arg1} ${arg2}`, ['Another', 'function in other thread'])
    .then(console.log) // logs 'this.$worker run 2: Another function in other thread'
    .catch(console.error) // logs any possible error
```

### this.$worker.create(*[actions]?*)

> Where:
>
> - *[actions]* is an optional array of objects with two fields, `message` and `func`. Essentially, it is a messages-actions map.

> If *[actions]* is omitted or `undefined`, the created **<worker>** will have no registered actions, so you'll have to use the method `register` before you can use the **<worker>**.



If you plan to reuse a ****, you should use this method. It creates a reusable **** (not a real Web Worker, more on this ahead) with determined actions to be runned through its `postMessage()` or `postAll()` methods.

E.g.:

```
const actions = [
  { message: 'func1', func: () => `Worker 1: Working on func1` },
  { message: 'func2', func: arg => `Worker 2: ${arg}` },
  { message: 'func3', func: arg => `Worker 3: ${arg}` },
  { message: 'func4', func: (arg = 'Working on func4') => `Worker 4: ${arg}` }
]

let worker = this.$worker.create(actions)
```

### <worker>.postMessage(*message, [args]?*)

> Where:
>
> - **<worker>** is a worker created with `this.$worker.create([actions])`
> - *message* is one of the messages in *[actions]*
> - *[args]* is an optional array of arguments that will be used by the function registered with *message*

> When the function does not expect any arguments or the expected arguments have default values, *[args]* can be omitted safely.



When the expected arguments do not have default values, _[args]_ should be provided.

This method works like Promise.resolve(), but in another thread.

E.g.:

```
const actions = [
  { message: 'func1', func: () => `Worker 1: Working on func1` },
  { message: 'func2', func: arg => `Worker 2: ${arg}` },
  { message: 'func3', func: arg => `Worker 3: ${arg}` },
  { message: 'func4', func: (arg = 'Working on func4') => `Worker 4: ${arg}` }
]

let worker = this.$worker.create(actions)

worker.postMessage('func1')
  .then(console.log) // logs 'Worker 1: Working on func1'
  .catch(console.error) // logs any possible error

worker.postMessage('func1', ['Ignored', 'arguments'])
  .then(console.log) // logs 'Worker 1: Working on func1'
  .catch(console.error) // logs any possible error

worker.postMessage('func2')
  .then(console.log) // logs 'Worker 2: undefined'
  .catch(console.error) // logs any possible error

worker.postMessage('func3', ['Working on func3'])
  .then(console.log) // logs 'Worker 3: Working on func3'
  .catch(console.error) // logs any possible error

worker.postMessage('func4')
  .then(console.log) // logs 'Worker 4: Working on func4'
  .catch(console.error) // logs any possible error

worker.postMessage('func4', ['Overwrited argument'])
  .then(console.log) // logs 'Worker 4: Overwrited argument'
  .catch(console.error) // logs any possible error
```

### <worker>.postAll(*[message1,... || {message: message1, args: [args1]},... || [args1],...]?*)

> Where:
>
> - **<worker>** is a worker created with `this.$worker.create([actions])`
> - The argument is an optional array which accepts one of the following:
>   - *message1,...* - strings containing one or more of the messages in *[actions]*
>   - *{message: message1, args: [args1]},...* - objects containing two fields, `message` (a message from *actions*) and `args` (the arguments to be used by the correspondent function)
>   - *[args1],...* - arrays of arguments to be used by the registered actions.

> If *[message1,...]* is `undefined` or no argument is given, **<worker>** will run all registered actions without arguments.



If _[{message: message1, args: [args1]},...]_ or _[[args1],...]_ is used, you should use `[]` (an empty array) as _[args]_ for the functions that does not expect arguments, or if the respective argument of your function has a default value and you want it to be used. If you use `[null]` this will be the value assumed by function argument.

When using _[[args1],...]_, you MUST input the same number of arguments as registered actions, even if some action doesn't accept any arguments! In that case use a `[]`, as stated above. See examples below.

If _[{message: message1, args: [args1]},...]_ is used, every object must contain the fields `message` and `args`.

This method works like Promise.all(), but in another thread.

E.g.:

```
const actions = [
  { message: 'func1', func: () => `Worker 1: Working on func1` },
  { message: 'func2', func: arg => `Worker 2: ${arg}` },
  { message: 'func3', func: arg => `Worker 3: ${arg}` },
  { message: 'func4', func: (arg = 'Working on func4') => `Worker 4: ${arg}` }
]

let worker = this.$worker.create(actions)

worker.postAll()
  .then(console.log) // logs ['Worker 1: Working on func1', 'Worker 2: undefined', 'Worker 3: undefined', 'Worker 4: Working on func4']
  .catch(console.error) // logs any possible error

worker.postAll(['func1', 'func3'])
  .then(console.log) // logs ['Worker 1: Working on func1', 'Worker 3: undefined']
  .catch(console.error) // logs any possible error

worker.postAll([{ message: 'func1', args: [] }, { message: 'func3', args: ['Working on func3'] })
  .then(console.log) // logs ['Worker 1: Working on func1', 'Worker 3: Working on func3']
  .catch(console.error) // logs any possible error

worker.postAll([[], ['Working on func2'], ['Working on func3'], []])
  .then(console.log) // logs ['Worker 1: Working on func1', 'Worker 2: Working on func2', 'Worker 3: Working on func3', 'Worker 4: Working on func4']
  .catch(console.error) // logs any possible error

worker.postAll([[], ['func2'], ['func3'], ['Overwriting default value of arg on func4']])
  .then(console.log) // logs ['Worker 1: Working on func1', 'Worker 2: func2', 'Worker 3: func3', 'Worker 4: Overwriting default value of arg on func4']
  .catch(console.error) // logs any possible error
```

### <worker>.register(*action* || *[actions]*)

> Where:
>
> - **<worker>** is a worker created with `this.$worker.create([actions])`
> - *action* is an object with two fields, `message` and `func`
> - *[actions]* is an array of objects, and each object is an *action*, as defined above

> You can use *action* or *[actions]*, but not both at the same time.

E.g.:

```
const initialActions = [
  { message: 'func1', func: () => 'Working on func1' }
]

let worker = this.$worker.create(initialActions)

worker.postAll()
  .then(console.log) // logs ['Working on func1']
  .catch(console.error) // logs any possible error

// registering just one action
worker.register({ message: 'func2', func: () => 'Working on func2' })

worker.postAll()
  .then(console.log) // logs ['Working on func1', 'Working on func2']
  .catch(console.error) // logs any possible error

// registering multiple actions
worker.register([
  { message: 'func3', func: () => 'Working on func3' },
  { message: 'func4', func: () => 'Working on func4' }
])

worker.postAll()
  .then(console.log) // logs ['Working on func1', 'Working on func2', 'Working on func3', 'Working on func4']
  .catch(console.error) // logs any possible error
```

### <worker>.unregister(*message* || *[messages]*)

> Where:
>
> - **<worker>** is a worker created with `this.$worker.create([actions])`
> - *message* is one of the messages in *[actions]*
> - *[messages]* is an array containing one or more messages, and each message is a *message*, as defined above

> You can use *message* or *[messages]*, but not both at the same time.

E.g.:

```
const initialActions = [
  { message: 'func1', func: () => 'Working on func1'},
  { message: 'func2', func: () => 'Working on func2'},
  { message: 'func3', func: () => 'Working on func3'},
  { message: 'func4', func: () => 'Working on func4'}
]

let worker = this.$worker.create(initialActions)

worker.postAll()
  .then(console.log) // logs ['Working on func1', 'Working on func2', 'Working on func3', 'Working on func4']
  .catch(console.error) // logs any possible error

// unregistering just one action
worker.unregister('func2')

worker.postAll()
  .then(console.log) // logs ['Working on func1', 'Working on func3', 'Working on func4']
  .catch(console.error) // logs any possible error

// unregistering multiple actions
worker.unregister(['func3', 'func1'])

worker.postAll()
  .then(console.log) // logs ['Working on func4']
  .catch(console.error) // logs any possible error
```

## Closing workers?

You may be thinking: "How do I terminate those reusable workers if there's no `close()` or `terminate()` methods?"

Well, when you create a reusable worker, you don't receive a real Web Worker.

Instead, you get an object which holds the given messages-actions map, and when you call `postMessage()` or `postAll()` it will, under the hood, call `run()` with the correspondent functions.

So, to "terminate" a "worker" when it is not needed anymore, you can just do:

```
let worker = this.$worker.create(actions)

// use the worker

worker = null
```