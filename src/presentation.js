// Import React
import React from "react";
import CodeSlide from 'spectacle-code-slide';

// Import Spectacle Core tags
import {
  Deck,
  Appear,
  Slide,
  Image,
  Notes,
  Heading,
  ListItem,
  List,
  Text
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const theme = createTheme({
  primary: "#00adef",
  secondary: "#222",
  clear: "white",
  medium: "#ccc",
  darkMedium: "#555"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck progress="number" transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
        <Slide transition={["zoom"]} bgColor="clear">
          <Heading size={6} caps lineHeight={1} textColor="primary">
            javascript 
          </Heading>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Async and Promises
          </Heading>
          <Text margin="10px 0 0" textColor="medium" size={5}>
            Tech talk
          </Text>
          <Notes>
            <p>
              <p>Pool gave me insights about promises and generators</p>
              <p>
                Decided to explain promises but also what as happening under the wood as people
                are already using and understand promises "out of the wood"
              </p>
              <p>
                That lead me to make this talk about async and promises in javascript
              </p>
            </p>
          </Notes>
        </Slide>

        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit caps lineHeight={1} textColor="secondary">
            First of all
          </Heading>
          <Text margin="10px 0 0" textColor="clear" size={5}>
            lets take a few steps back...
          </Text>
          <Notes>
            <p>To understand what promises have changed javascript. We have to know how javascript works</p>
          </Notes>
        </Slide>

        <Slide transition={["zoom"]} bgColor="primary">
          <Appear order={0}>
            <Heading size={4} fit lineHeight={1} textColor="clear">
              How does javascript handles async?
            </Heading>
          </Appear>
          <Appear order={1}>
            <Image 
              height="300"
              src="https://media3.giphy.com/media/3o6ZsW0SLwvSUm8FpK/giphy.gif"
            />
          </Appear>
          <Notes>
            <p>
              <p>People tend to be confused about how javascript handles async</p>
              <p>What is executed now, what is executed later, people ask?</p>
              <p>It handles... magically</p>
            </p>
          </Notes>
        </Slide>

        <Slide transition={["zoom"]} bgColor="primary">
          <Appear>
            <div>
              <Heading size={4} fit lineHeight={1} textColor="clear">
                what is executed now
              </Heading>
              <Heading size={4} fit lineHeight={1} textColor="clear">
                what is executed later?
              </Heading>
            </div>
          </Appear>
          <Appear >
            <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
              <ListItem>programs are executed in chunks</ListItem>
              <ListItem>only execute one chunk at the time (run to completion)</ListItem>
            </List> 
          </Appear>
          <Notes>
            <p>
              <p>To first understand this we have to understand two points</p>
              <p>Single threaded, one thing at the time</p>
              <p>Programs are executed in code chunks (functions)</p>
            </p>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/setTimeoutNowLater.example')}
          ranges={[
            { 
              loc: [0, 12],
              title: "now vs later",
            },
            {
              loc: [0, 3],
              title: "now",
            },
            {
              loc: [8, 11],
              title: "now"
            },
            {
              loc: [5, 6],
              title: "later (after 1000ms passed)",
            }
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            the event loop
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
            { /* TODO: brief introduction of what is the event loop */ }
            <Appear>
              <ListItem><span role="img" aria-label="warning">⚠️ </span> javascript had no builtin asynchrony until ES6</ListItem>
            </Appear>
            <Appear>
              <ListItem>event loop has no notion of time</ListItem>
            </Appear>
            <Appear>
              <ListItem>javascript runs within an hoisting environment (browser, node, ...)</ListItem>
            </Appear>
            <Appear>
              <ListItem>hoisting environment schedules code executions</ListItem>
            </Appear>
            <Appear>
              <ListItem>an item "in the loop" is a chunk of code</ListItem>
            </Appear>
          </List> 
          <Notes>
            <p>
              <p>
                javascript by itself has no asynchrony. It is not possible to say "do this in X time"
              </p>
              <p>
                so, we used setTimeout to run something later, how does javascript has no asynchrony?
              </p>
              <p>
                event loop is pretty dummy, it just executes synchronously the code chunks that appear there
              </p>
              <p>
                until ES6, every asynchronous code that runs in javascript is triggered by the environment
              </p>
              <p>
                how? through native APIs, onscroll, setTimeout, setInterval, filesystem, network. 
                They're not part of the language.
                They are native APIs. They just APIs that javascript delegates tasks
              </p>
            </p>
          </Notes>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            example: doing an ajax request
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
            <Appear>
              <ListItem>program tries to do an ajax request, with a callback</ListItem>
            </Appear>
            <Appear>
              <ListItem>js engine delegates the request to the environment</ListItem>
            </Appear>
            <Appear>
              <ListItem>when the ajax finishes, it **calls javascript back** (by inserting the callback code "in the loop")</ListItem>
            </Appear>
            <Appear>
              <ListItem>as soon as the callback code "gets is chance", it executes</ListItem>
            </Appear>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/event-loop.example')}
          ranges={[
            { loc: [0, 1], title: "dummy event loop implementation" },
            { loc: [0, 1], title: "an array of 'chunks' to execute" },
            { loc: [4, 5], title: "looping forever" },
            { loc: [6, 15], title: "executing tasks" },
          ]}
        />
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/set-timeout.example')}
          ranges={[
            { 
              loc: [0, 1],
              title: "explaining setTimeout",
              note: "it is defined by the env (not in JS spec, it's a native browser api)"
            },
            { 
              loc: [0, 3],
              title: "it doesn't put the callback on the loop" 
            },
            { 
              loc: [0, 3],
              title: "just waits for 1000ms before putting it there" ,
              note: `
                this is why 'js has no notion of async'. 
                It just executes the code.
                If the code gets there asynchronously, thats another thing
              `
            },
            { 
              loc: [0, 3],
              title: "setTimeout time accuracy" ,
              note: `
                This is because the code is added to the end of the loop.
                The loop will execute all the other tasks.
                Until it gets to the callback code chunk.
              `
            },
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            blocking the event loop
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
            <Appear>
              <ListItem>if you have a task that executes for too long, it will block the event loop</ListItem>
            </Appear>
            <Appear>
              <ListItem>image that one task does synchronous heavy processing</ListItem>
            </Appear>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/sync-loop.example')}
          ranges={[
            { 
              loc: [0, 3],
              title: "looping through 100000 posts",
              note: "this will block the event loop (and consequently, every js code in the browser)"
            }
          ]}
        />
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/async-loop.example')}
          ranges={[
            { 
              loc: [0, 5],
              title: "a node/async way",
              note: "proccesing chunks"
            },
            { 
              loc: [6, 9],
              title: "process a chunk at the time",
              note: "and concat to the main array"
            },
            { 
              loc: [10, 12],
              title: "if there are more to process, call itself",
              note: "add the *processing* to the end of the loop with setTimeout(cb, 0)"
            },
            { 
              loc: [10, 12],
              title: "why this is the better way?",
              note: "we let the browser execute whatever is in the loop between chunks"
            },
            { 
              loc: [9, 12],
              title: "note: in node you would use process.nextTick",
              note: "it is actually the *same* but without tricks"
            }
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            Example: React new "reconciler"
          </Heading>
          <Image 
            width={"100%"}
            src={require('./img/fiber.png')}
          />
          <Notes>
          </Notes>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            ES6 introduces *real asynchrony*
          </Heading>
          <Heading size={6} lineHeight={1} textColor="secondary">
            and promises 🎉
          </Heading>
          <Appear>
            <Heading size={6} fit lineHeight={6} textColor="clear">
              let's get back to our dummy event loop
            </Heading>
          </Appear>
          <Notes>
          </Notes>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            the job queue
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
            <Appear>
              <ListItem>"execute this later, but as soon as you can"</ListItem>
            </Appear>
            <Appear>
              <ListItem>the queue executes until it is clear</ListItem>
            </Appear>
            <Appear>
              <ListItem>a job can add other jobs to the queue</ListItem>
            </Appear>
            <Appear>
              <ListItem>it is not possible (yet) for a developer to interact directly with the job queue</ListItem>
            </Appear>
            <Appear>
              <ListItem>explaining it with dummy code **agaaaain**</ListItem>
            </Appear>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/event-loop-job.example')}
          ranges={[
            { 
              loc: [0, 10],
              title: "the same dummy event loop",
              note: "proccesing chunks"
            },
            { 
              loc: [18, 19],
              title: "with a difference - the job queue",
              note: "the job queue executes at the end of every *tick* (every iteration of the loop)"
            },
            { 
              loc: [18, 19],
              title: "what does this mean?",
              note: "we can now run a chunk of code *immediately* after other chunk"
            },
            { 
              loc: [18, 19],
              title: "run this *then* that"
            },
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            callbacks, why?
          </Heading>
          <Appear>
            <Heading size={4} fit lineHeight={1} textColor="clear">
              not
            </Heading>
          </Appear>
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/callback-hell.example')}
          ranges={[
            { 
              loc: [0, 1],
              title: "do an ajax call",
            },
            { 
              loc: [1, 2],
              title: "then do another",
            },
            { 
              loc: [2, 3],
              title: "then do another",
            },
            { 
              loc: [3, 4],
              title: "then do something",
            },
            { 
              loc: [0, 7],
              title: "callback hell!!!",
            }
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            problems callbacks have
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
            <Appear>
              <ListItem>lack of readability</ListItem>
            </Appear>
            <Appear>
              <ListItem>lack of sequentiability</ListItem>
            </Appear>
            <Appear>
              <ListItem>lack of trustability</ListItem>
            </Appear>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={5} lineHeight={1} textColor="clear">
            introducing
          </Heading>
          <Heading size={4} fit lineHeight={1} textColor="clear">
            promises
          </Heading>
          <Appear>
            <Heading size={5} lineHeight={1} textColor="clear">
              finally!!
            </Heading>
          </Appear>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
            <Appear>
              <ListItem>promises are future values</ListItem>
            </Appear>
            <Appear>
              <ListItem>why are they so cool? They solve the listed callbacks problems</ListItem>
            </Appear>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/ajax-promises.example')}
          ranges={[
            { 
              loc: [0, 8],
              title: "old ajax implementation",
            },
            { 
              loc: [11, 15],
              title: "with promises",
            },
            { 
              loc: [11, 15],
              title: "much simpler, bruh",
            },
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={2} fit lineHeight={1} textColor="clear">
            what about the other problems?
          </Heading>
          <Notes>
          </Notes>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            lack of trust
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
            <Appear>
              <ListItem>called too early or too late</ListItem>
            </Appear>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/promises/sync-async-values.example')}
          ranges={[
            { 
              loc: [0, 5],
              title: "always execute asynchronously",
            }
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            lack of trust
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
            <ListItem>called too early or too late</ListItem>
            <Appear>
              <ListItem>called too few or too many times</ListItem>
            </Appear>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/promises/explicit-sequential-events.example')}
          ranges={[
            { 
              loc: [0, 4],
              title: "promise only resolves/rejects once",
            }
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            lack of trust
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
              <ListItem>called too early or too late</ListItem>
              <ListItem>called too few or too many times</ListItem>
            <Appear>
              <ListItem>called with wrong parameters and/or context</ListItem>
            </Appear>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/promises/wrong-parameters.example')}
          ranges={[
            { 
              loc: [0, 6],
              title: "only have 1 callback argument",
            }
          ]}
        />
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/promises/error.example')}
          ranges={[
            { 
              loc: [0, 4],
              title: "error handling",
            }
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            lack of trust
          </Heading>
          <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
              <ListItem>called too early or too late</ListItem>
              <ListItem>called too few or too many times</ListItem>
              <ListItem>called with wrong parameters and/or context</ListItem>
          </List> 
          <Notes>
          </Notes>
        </Slide>
        <CodeSlide 
          lang="js"
          transition={[]}
          textSize={25}
          code={require('./examples/promisifying.example')}
          ranges={[
            { 
              loc: [0, 0],
              title: "promisifying a callbacked function",
            },
            { 
              loc: [0, 4],
              title: "a function with callback",
            },
            { 
              loc: [4, 5],
              title: "define a function",
            },
            { 
              loc: [5, 6],
              title: "that returns a promise",
            },
            { 
              loc: [6, 13],
              title: "that returns a promise",
            },
            { 
              loc: [16, 23],
              title: "usage",
            }
          ]}
        />
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            thank you!
          </Heading>
          <Heading size={3} lineHeight={1} textColor="clear">
            questions
          </Heading>
        </Slide>
      </Deck>
    );
  }
}
