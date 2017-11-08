// Import React
import React from "react";
import CodeSlide from 'spectacle-code-slide';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Appear,
  Image,
  Heading,
  CodePane,
  Notes,
  ListItem,
  List,
  Quote,
  Slide,
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
          <Heading size={4} caps lineHeight={1} textColor="primary">
            wtf are 
          </Heading>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Promises?
          </Heading>
          <Text margin="10px 0 0" textColor="medium" size={5}>
            Tech talk
          </Text>
        </Slide>

        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit caps lineHeight={1} textColor="secondary">
            First of all
          </Heading>
          <Text margin="10px 0 0" textColor="medium" size={5}>
            lets take a few steps back...
          </Text>
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
        </Slide>

        <Slide transition={["zoom"]} bgColor="primary">
          <Appear order={0}>
            <Heading size={4} fit lineHeight={1} textColor="clear">
              now vs later
            </Heading>
          </Appear>
          <Appear order={0}>
            <List textColor="clear" textSize={40} margin="20 0 0 0" start={1} type="A">
              <ListItem>execute one chunk at a time</ListItem>
              <ListItem>later is not after now</ListItem>
            </List> 
          </Appear>
          <Notes>
            <h2>execute one chunk at a time</h2>
            <p>One part of the program run now, others run later</p>
            <p>The most common used chunk is a function</p>

            <h2>later is not after now</h2>
            <p>Running later is not strictly immediately after now</p>
            <p>Tasks that can't complete now will complete asynchronously</p>
          </Notes>
        </Slide>

        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={4} fit lineHeight={1} textColor="clear">
            the most common use of async
          </Heading>
        </Slide>
        
        <CodeSlide 
          lang="js"
          code={require("raw-loader!../ajax.example")}
          ranges={[
            { loc: [0, 10], title: "doin' an ajax request" }
          ]}
        />
      </Deck>
    );
  }
}
