# Async & Promises

This presentation explains how promises work by explaining how async works in javascript
It covers:

- asynchrony
- the event loop
- the job queue
- promises

## TODO - slides

## how does javascript handles async?
- problem - what is executed now and what is executed later?
without understanding what's happening underneath, it is complicated to understand this magic
- programs are executed in chunks, the most common *chunk unit* is a **function**
Javascript only executes one chunk at the time, this meaning that one chunk is executing now and all the others
later
- example - doing an ajax request
```js
ajax( "https://core.staging.uniplaces/api/guests", (data) => {
  // deal with the response - **later**    
});
// yeah, it **is** possible to do async ajax requests
// let's hope at the end of this talk you understand why you shouldn't
```
- scheduling a function to run later
```
let number 

const now = () => 10

const later = () => {
  number =  number * 2
  
  console.log('lateeeeer', number)
}

number = now()

setTimeout(later, 1000)
```
what executes now
```
let number 

const now = () => 10

const later = () => { /* define the function */ }

number = now()

setTimeout(later, 1000)
```
what executes later
```
  number =  number * 2
  console.log('lateeeeer', number)
```

## the event loop
- shocking news - despite allowing async code, javascript had no builtin support for async
javscript never had direct notion of asynchrony built into it until ES6
- javascript run's everywhere nowadays, but it doesn't run in isolation, it runs within a **hoisting** enveryonment, commonly the browser or a node server.
- all the environments have this mecanism that executes chunks of code over time, **the event loop**
- the event loop has no notion of time
- an item in the queue is a *chunk of code*
- it is the surrounding event that *schedules* events (js code executions)
- when you try to do an ajax request:
    - your js program tries to do an ajax request with this callback
    - the js engine tells the hoisting environment, do this request and then
when you are finished, call this function
    - now the browser handles the network, when it has a response it will *call you back*

### what does **calling you back** means?

it means adding your callback's code at the end of the **event loop**

### dummy event loop implementation
```
// `eventLoop` is an array that acts as a queue (first-in, first-out)
var eventLoop = [ ];
var event;

// keep going "forever"
while (true) {
	// perform a "tick"
	if (eventLoop.length > 0) {
		// get the next event in the queue
		event = eventLoop.shift();

		// now, execute the next event
		try {
			event();
		}
		catch (err) {
			reportError(err);
		}
	}
}
```

### explaining `setTimeout`
it's important to clarify that setTimeout doesn't put your callback in the event loop.
it just sets a timer that will add it to the end of the event loop when it fires

    - this is also why setTimeout doens't grant you perfect temporal accuracy. You're guaranteed that your callback will not fire before the time interval you specified, but it can be after it, depending of the
*state of the queue* (the event loop).

- what does it mean javascript had no assynchrony until es6?
there was no specification for the event loop before, es6 specified how it works. 
why? because of **promises**, because they want to have fine-grained control over event loop scheduling.

### async !== parallel
javascript is fully assynchronous, however, it does not execute things in parallel. Event loop executes
one thing at the time.

    - async is the gap between now and later
    - parallel is allowing things to run at the same time

as there are no threads in javscript, it *runs to completion* non determinism comes from one single pain point - **race conditions**. 

if somehow javascript wouldn't have this *run to completion* behaviour, we would have much more problems within our code, meaning that the same code could have a lot of different outcomes, right?
Yeah, ES6 assynchrony introduces exactly that :troll: but don't worry, i will explain it in a minute.

### imagine instagram feed - with infinite scrolling

if we had to implement that:
- add something like an *onscroll* event
- after some scroll, trigger an *ajax request* to fetch more posts
- when we get the response, append it to the end of the feed

there are two parts of this tasks, i will call it *processes* just for the sake of the task, not that they're executing in parallel

process 1
```
onscroll, request 1
onscroll, request 2
onscroll, request 3
onscroll, request 4
onscroll, request 5
onscroll, request 6
onscroll, request 7
```

process 2
```
response 1
response 2
response 3
response 4
response 5
response 6
response 7
```

how it happens on the *event loop*
```
onscroll, request 1   <--- Process 1 starts
onscroll, request 2
response 1            <--- Process 2 starts
onscroll, request 3
response 2
response 3
onscroll, request 4
onscroll, request 5
onscroll, request 6
response 4
onscroll, request 7   <--- Process 1 finishes
response 6
response 5
response 7            <--- Process 2 finishes
```

### what if we wanna process the data comming from the request

- image you wanna go through all this posts and add `1 day` to their timestamp

```
...

posts = posts.map(post => {
    post.timestamp = moment(post.timestamp).add(1, 'day')
})
```

- it would be fine, if it was like a few thousands of posts. Now if it was 1million?
now that you know about the event loop, let's try to execute code that blocks it.
When the code you are executing is expensive/takes too long, and you execute it syncrohonously, the event loop has no *time* to get to the next item, this means it is **only executing your task**

```
while (true) {
    console.log('looooop')
}
```

### better way to do this?

somebody who has used node before would probably come with this approach

```
let processedPosts = []

function process(posts) => {
  const chunk = posts.splice(0, 1000)
  
  processedPosts = processedPosts.concat(
    chunk.map(post => post.timestamp = moment(posts.timestamp).add(1, 'day'))
  ) 

  if (posts.length) {
    setTimeout(process(posts), 0)
  }
}
```

the *setTimeout* 0 magic. As you may have understood, using `setTimeout` with 0 as a timeout means we're executing our callback after whatever it is on the event loop (we're appending an item to the end). Giving this way a change for the browser to execute whatever it needs.

## es6 introduces the job queue

- what is the job queue?
it's a queue hanging of at the end of every `tick` of the loop

looking back at our *dummy event loop implementation*
```
// `eventLoop` is an array that acts as a queue (first-in, first-out)
var eventLoop = [ ];
var event;

// keep going "forever"
while (true) {
	// perform a "tick"
	if (eventLoop.length > 0) {
		// get the next event in the queue
		event = eventLoop.shift();

		// now, execute the next event
		try {
			event();
		}
		catch (err) {
			reportError(err);
		} 

	}

    // execute the job queue after every single iteration
    jobQueue()
}
```

so, the *easy* way to explain the job queue is like "execute this later, but as soon as you can".
An item in the job queue is called *a job* (captain obviooous)

Jobs can add other jobs to the job queue, this meaning that you can also have infinite jobs creating one another.

```
console.log( "A" );

setTimeout( function(){
	console.log( "B" );
}, 0 );

// theoretical "Job API"
schedule( function(){
	console.log( "C" );

	schedule( function(){
		console.log( "D" );
	} );
} );
```

Anyone want's to try what this would print? `ACDB`

## Callbacks

We've used some callbacks along the way, everybody whom have used js have used it. It's just a matter of saying to a function *execute this, and them call this function*

```
ajax('https://core.uniplaces.com', function(err, data) {
   // blablabla 
})
```

### What would you do if you want to have dependent tasks?

easy

```
ajax('https://auth.uniplaces.com', function(err, data) {
    ajax(
      'https://core.uniplaces.com/api/guests/cc208a7a-cea6-4574-9fed-95ee27060689',
      { authToken: data.token },
      function(err, data) { console.log(data.profile.basic_info.full_name) }
    )
})
```

and another one?
```
ajax('https://auth.uniplaces.com', function(err, authData) {
    ajax(
        'https://core.uniplaces.com/api/guests/cc208a7a-cea6-4574-9fed-95ee27060689',
        function(err, guestData) {
            ajax(
              'https://core.uniplaces.com/api/pay',
              function(err, paymentData) {
                redirectToSuccessPage()
              }
            )
        }
    )
})
```
### callback hell

Callbacks come with some problems, one of them being loosing control of the invocation of the callback. It's whatever tool, library, wtv you're using that is calling the callback, so you just cross fingers and hope everything comes out fine.

The other is lack os trustability, readability and sequentiability.

## Promises

What are promises? Promises are future values. They give you an API so you can know when a task finishes so you can decide what happens afterwards. Most of you have used it, our JS projects use it a lot.
New APIs to the browser and dom are being built on Promises, it is critical for a JS developer nowadays to know about them. But why are promises so cool?

They solve most of the problems created by callbacks: Inversion of control, instead of being *someone* calling your function, it's the developer saying "do this `then` that", it is you executing the callback.

### Yeah yeah, I've used Promises, I know about that, what are you teaching me?

Promises are one of those things that people tend to use without really understanding (javascript being other of those things), and that happens because their API is so painfully obvious that is just **makes sense**. 

But let's try to go a little bit deeper in the abstraction

### The future value

Imagine we go to McDonalds, you choose your cheeseburger, and you get a paper with a number on it. That paper grants you that you will get your cheeseburger, that paper is a *future cheeseburger*. When the cashier calls your number, you can exchange your *promise of a cheesburguer* by the cheesburger itself.

## Let's come back to our ajax example

```
ajax('https://auth.uniplaces.com', function(err, authData) {
    ajax(
        'https://core.uniplaces.com/api/guests/cc208a7a-cea6-4574-9fed-95ee27060689',
        function(err, guestData) {
            ajax(
              'https://core.uniplaces.com/api/pay',
              function(err, paymentData) {
                redirectToSuccessPage()
              }
            )
        }
    )
})
```

And write it using promises

```
promisifiedAjax('https://auth.uniplaces.com')
  .then(promisifiedAjax('https://core.uniplaces.com/api/guests/cc208a7a-cea6-4574-9fed-95ee27060689'))
  .then(promisifiedAjax('https://core.uniplaces.com/api/pay'))
  .then(redirectToSuccess)
```

Can you see the difference?


### Things you can do with promises

Other that simplifying your code and making it easier to read and reason about (as shown in the example).

- Explicit sequential events

```
const authPayAndRedirect = 
  promisifiedAjax('https://auth.uniplaces.com')
    .then(promisifiedAjax('https://core.uniplaces.com/api/guests/cc208a7a-cea6-4574-9fed-95ee27060689'))
    .then(promisifiedAjax('https://core.uniplaces.com/api/pay'))
    .then(redirectToSuccess)

...

// In other different place in your code

authPayAndRedirect.then(() => Logger.log('Redirected to success after payment'))
```

- Have multiple consequences based on a completion event

```
const authAndPay = doAuthenticatedPayment()

...

// In other different place in your code

authAndPay.then(() => Logger.log('Redirected to success after payment'))

// And other

authAndPay.then(redirectToHome)
```

- Composability - by defining a common api, you can base your code on promises without knowing what's happening inside that promise

```
const redirectHomeAfterPayment = authAndPay.then(redirectToHome)

redirectHomeAfterPayment.then(() => Logger.log('Redirected home after the payment'))
```

- Error handling

```
redirectHomeAfterPayment.catch(() => callSoares('Payments are broken'))

// You can even have different error handlers
redirectHomeAfterPayment.catch(() => messageFelix('We are all devOps but its your turn to fix this'))
```

- Allowing a single API for both synchronous and asynchronous values

```
const stupidPromise = new Promise(resolve => resolve(10))

stupidPromise
    .then((number) => ajaxRequest(number))
    .then((response) => console.log(response))
```

- Allow both race and *wait for all* cases

```
Promise.all([
  getGuest(),
  getBookings(),
  getPayments()
]).then(([guest, booking, payments]) => {
  // this will only be called when the 3 promises are solved
})


Promise.race([
  getGuest(),
  getBookings(),
  getPayments()
]).then((firstPromiseSolved) => {
  // this will be called with the first promise solved
})
```

## Promise trust

Other than a nice and cleaner API, promises bigger advantages when compared to callbacks are **trust**.

Some issues we have with callbacks:

- Called too early
- Called too late
- Called too few or too many times
- Called with wrong parameters or wrong context
- Swallow exceptions or errors that might happen

### Called too early

There are utilities and libraries that by default call every callback in an async way, this meaning that something that might be happening *right now*, and that could be synchronous might be being handled as asynchronous. Promises solve this because even an immediately solved Promise `new Promise((resolve) => resolve())` can't be handled synchronously. 
This means that even if the Promise automatically resolves, your `then` will always be called asynchronously.

### Called too late

Same case as the previous but when there are things that are synchronous but callbacks are being called asyncrhonously.

### Called too few or too many times

By definition, callbacks are called just once. Too few would be 0 times, and too many would be more than 1, you can imagine the problems it may cause if you're using an utility (that you don't know and don't need to know its internals) and it calls your callbacks more than once.

Promises use their API to grant that even if you call `resolve` more than once, it is ignored, this meaning that the code inside `then` will only be called once.

### Called with wrong parameters or wrong context

Promises can only have one single resolution value (fullfilment or rejection). And Promises grant that the rejection or fullfilment value with by passed as a single parameter to the callbacks (defining a simple, clean API).


### Swallow exceptions or errors that might happen

If an error occurs inside a promise, it will always bubble up to the caller. And Promises provide a standard way of cathing those errors, through `catch` method. This is also a standard way of dealing with errors within Promises. 

Callbacks had the `error` first convention in node js, but it was enforced by convention, here it is enforced by the API itself.

## Promisifying

Nowadays, most Promise libraries offer an utility called `promisify`, it simply wraps a callbacked function and returns a promise.


## About cancellable promises
https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md#promise-uncancelable

## Describe Promise API

- TODO

# Credits

Thanks to getify (Kyle Simpson) for his awesome job with [YDKJS](https://github.com/getify/You-Dont-Know-JS), without those books it would be much harder to understand JS
