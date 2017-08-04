## Super Set

### Background

According to [Wikipedia](https://en.wikipedia.org/wiki/Set_(game))... "Set is a real-time card game designed by Marsha Falco in 1974 and published by Set Enterprises in 1991. The deck consists of 81 cards varying in four features: number (one, two, or three); symbol (diamond, squiggle, oval); shading (solid, striped, or open); and color (red, green, or purple).[1] Each possible combination of features (e.g., a card with three striped green diamonds) appears precisely once in the deck."

It's essentially a patterns recognition game. Your goal is to identify a set of 3 cards that share common and different characteristics. Once I am able to render the cards, a demo image will be provided.

It can be played solo (timed) or against others (highest set count wins).

### Functionality & MVP  

In this version of set, I will emulate the real life card game to the best of my ability. Users will be able to:

- [ ] Start the game and time one's self
- [ ] Continue to play until all sets are found
- [ ] When a stagnated board occurs, another 3 cards will be displayed (either automatically or on click)
- [ ] Visual alerts for successful/unsuccessful sets

In addition, this project will include:

- [ ] A automated demo selecting a set and simplified game rules.
- [ ] A production Readme

### Wireframes

This project will be a single page of, initially, 9 cards. There will be a timer on the top right, buttons to deal, reset, and view rules/demo. In the footer, will be links to the project's repo, my LinkedIn, and my portfolio site.

The cards will have hover effects to show the user it is active and selected cards will be highlighted with an obvious highlight. Upon selecting 3 cards the user believes is a set, the background color will flash to alert whether it was successful or not.


### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for structure and game logic,
- Sass to compile scss
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`game.js`: this script will handle the logic for creating and evaluation of rules. These rules include validating a set, realizing stagnated boards, and initializing correct deck methods.

`deck.js`: this script will handle the deck's creation and dealing methods.

`card.js`: this lightweight script will house the constructor and update functions for card objects. Each card will require a shape, pattern, color, and number.

### Implementation Timeline

**Day 1**: Set up dev environment. Set up overall deck and card functions. Styling and visual components will be a priority here as everything will be in plain Javascript and styling for transitions and animations. Goal for the day: Get the dealing logic correct. 1. deal 9 cards. 2. realize stagnated boards. 3. deal another 3 with a fluid display.

**Day 2**: Dedicate this day to setting up the patterns algorithms. Figure a way to programmatically identify which cards set with the other two. Continue styling and even get to the visual stunts. Goal for the day: Be able to select a set and have the background respond and set recorded in success array.

**Day 3**: Continue with writing and fine tuning game logic. Make sure each process is running correctly, in the right order. Make sure the game is styled well and the code is clean.

**Day 4**: Debug day and fine tuning. Goals for the day: Complete project with finely polished style and experience.

### Bonus features

Current and future bonus features

- [ ] Auto deal when board is stagnant.
- [ ] Visual and auditory cues for success/failures
- [ ] Implement settings features to mute game, change colors, shapes, and patterns.
