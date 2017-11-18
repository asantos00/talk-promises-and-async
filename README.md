# Async & Promises

This presentation explains how promises work by explaining how async works in javascript
It covers:

- asynchrony
- the event loop
- promises
- the job queue

## TODO - slides


* the event loop

- js had no built in asyncrony until ES6
- Every task for JS to do goes to event loop
- Javascript functions run to completion
- Every *cycle of the while* is called a **tick**
- `setTimeout(cb, 0)`
- Show fake code of the while true to show the event loop
- `https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch1.md`

* se
* cb hell
* the solution (promises)
- job queue
- promise api and advantages

# Credits

Thanks to getify (Kyle Simpson) for his awesome job with [YDKJS](https://github.com/getify/You-Dont-Know-JS), without those books it would be much harder to understand JS
