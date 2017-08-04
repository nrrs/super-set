## Super Set

### About the Game

According to [Wikipedia](https://en.wikipedia.org/wiki/Set_(game))...
> "Set is a real-time card game designed by Marsha Falco in 1974 and published by Set Enterprises in 1991. The deck consists of 81 cards varying in four features...
The game evolved out of a coding system that the designer used in her job as a geneticist."

As a patterns recognition game, your goal is to identify a set of 3 cards. Each card has 4 main characteristics: shape, color, pattern, and count. Any combination of the 4 can be a valid set, as long as each characteristic is the same or completely different.

![demo](/docs/demo.gif)

Set can be played solo (timed) or against others (highest number of books wins). In this implementation, your goal is to find a set within 30 seconds. If you just want to play, feel free to ignore the game over alert and continue playing!

### Functionality & Features

In this version of set, I will emulate the real life card game to the best of my ability.

- [x] Start the game and select sets.
- [x] Provide visual cues to validate or reject selections
- [x] Continue to play until all sets are found
- [x] Deal button to shuffle stagnated boards
- [x] Proper game logic to prevent duplications

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript
- HTML5/CSS3 (HTML5 Boilerplate & Modernizr)
- Webpack & Sass

The game utilizes `ES6` classes. This game was created using a total of 3.

`Game`: It handles the logic for creating, timing, and evaluating sets.

`Deck`: This class handles the deck's creation and dealing methods.

`Card`: This class constructs a card based on shape, pattern, color, and number/count.

### Bonus features

Current and future bonus features

- [ ] Auto deal when board is stagnant.
- [ ] Visual and auditory cues for success/failures
- [ ] Implement settings features to mute game, change colors, shapes, and patterns.
