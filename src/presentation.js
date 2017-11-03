// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Code,
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';

import eventLoopCode from './event-loop.txt'

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={3}  lineHeight={1} textColor="tertiary">
            wtf are
          </Heading>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Promises?!
          </Heading>
        </Slide>
        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={3} lineHeight={1} textColor="primary">
            {`First of all, how does async works in javascript?`}
          </Heading>
        </Slide>
        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={3} lineHeight={1} textColor="primary">
            The event loop
          </Heading>
        </Slide>
        <CodeSlide
            transition={[]}
            lang="js"
            code={eventLoopCode}
            ranges={[
              { loc: [0, 2] },
              { loc: [2, 5], title: "Walking through some code" }
            ]}/>
      </Deck>
    );
  }
}
