// import Card from './card';
let selectedCards = [];
let currentBoard = [];
let setScore = 0;
let defaultTimer = 30;

function shuffle(cards) {
  let currentIdx = cards.length;
  let tempVal, randomIdx;
  while (currentIdx !== 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;
    tempVal = cards[currentIdx];
    cards[currentIdx] = cards[randomIdx];
    cards[randomIdx] = tempVal;
  }
  return cards;
}

class Game {
  constructor() {
    const deck = new Deck();
    this.deck = deck;
    this.deal(12, deck);
    this.timer = document.getElementById('timer');
    this.currentTimer = null;
    this.startTimer = this.startTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    document.getElementById('deal-button').onclick = this.redeal.bind(this);
    document.getElementById('play').onclick = () => this.play();
  }

  play() {
    console.log("Let's play Set!");
    document.getElementById('splash').className = "hidden";
    this.startTimer();
  }

  gameOver() {
    this.clearTimer();
    document.getElementById('alerts').className = "error game-over bounceInDown";
    document.getElementById('alerts').innerHTML = "GAME OVER!";
  }

  startTimer() {
    console.log('Timer Started');
    this.timer.value = `${defaultTimer}`;
    this.currentTimer = setInterval(() => {
      this.timer.value = parseInt(this.timer.value) - 1;
      if (this.timer.value === "0") {
        this.gameOver();
      }
    }, 1000);
  }

  clearTimer() {
    console.log('Timer Cleared');
    clearInterval(this.currentTimer);
    this.timer.value = `${defaultTimer}`;
  }

  redeal() {
    this.deck = this.deck.concat(currentBoard);
    shuffle(this.deck);
    document.querySelectorAll('.card-container').forEach (el => {
      el.removeChild(el.childNodes[0]);
    });
    this.deal(12);
  }

  evaluateSet(cards) {
    if ( this.shapeSet(cards) &&
        this.colorsSet(cards) &&
        this.patternsSet(cards) &&
        this.numbersSet(cards) ) {
      this.flash('success', 'Valid set!');
      this.addPoints();
      setTimeout(() => { // Update the board after 1.5s of animations
        cards.forEach ( (card, i) => {
          const bye = document.querySelector(`[data-id='${cards[i].id}']`);
          const currId = cards[i].id;
          currentBoard.forEach( boardElement => {
            if (boardElement.id === currId) {
              const remove = currentBoard.indexOf(boardElement);
              currentBoard.splice(remove, 1);
            }
          });
          if (setScore < 24) { // If set count < 24, keep filling the board.
            const drawn = this.deck.shift();
            currentBoard.push(drawn);
            const newCard = this.createNewCard(drawn, i);
            newCard.classList.add('zoomIn');
            bye.parentNode.replaceChild(newCard, bye);
          } else {  // Deck is empty. Clean up the board.
            bye.parentNode.removeChild(bye);
          }
        });
      }, 1500);
      console.log('valid set, reset timer');
      this.clearTimer();
      this.startTimer();
    } else {
      Array.from(document.querySelectorAll('.selected')).forEach( el => {
        el.classList.remove('shake');
        el.classList.add('shake');
      });
      this.flash('error', 'Not a valid set!');
    }
    selectedCards = [];
  }

  flash(type, message) {
    const alert = document.getElementById('alerts');

    alert.className = '';
    alert.classList.remove('bounceOutUp');
    alert.classList.add(type);
    alert.classList.add('bounceInDown');
    alert.innerHTML = `${message}`;

    setTimeout(() => { // allot time for alert animations
      const arr = document.querySelectorAll('.selected');
      alert.classList.remove('bounceInDown');
      arr.forEach(el => {
        el.classList.remove('shake');
        el.classList.remove('selected');
      });
    }, 1000);
    setTimeout(() => { alert.classList.add('bounceOutUp'); }, 1000);
    setTimeout(() => { alert.classList.remove(type); }, 1750);
  }

  createNewCard(card, i) {
    const cardElement = document.createElement('div');
    const cardElementChildContainer = document.createElement('div');

    cardElement.setAttribute(
      'data-id', `${card.shape}-${card.color}-${card.pattern}-${card.number}`
    );
    cardElement.setAttribute('data-shape', `${card.shape}`);
    cardElement.setAttribute('data-color', `${card.color}`);
    cardElement.setAttribute('data-pattern', `${card.pattern}`);
    cardElement.setAttribute('data-number', `${card.number}`);
    cardElement.className += ('card');
    cardElement.addEventListener('click', this.selectCard);
    cardElementChildContainer.className += "shape-container";
    cardElement.appendChild(cardElementChildContainer);

    for (let j = 0; j < card.number; j++) {
      const cardElementChild = document.createElement('div');
      cardElementChild.className += (
        `shape ${card.shape} ${card.color} ${card.pattern} ${card.number}`
      );
      cardElementChildContainer.appendChild(cardElementChild);
    }

    return cardElement;
  }

  shapeSet(cards) {
    if (((cards[0].shape === cards[1].shape) &&
        (cards[1].shape === cards[2].shape) &&
        (cards[0].shape === cards[2].shape)) ||
       ((cards[0].shape !== cards[1].shape) &&
        (cards[1].shape !== cards[2].shape) &&
        (cards[0].shape !== cards[2].shape))) {
      return true;
    } else {
      return false;
    }
  }

  colorsSet(cards) {
    if (((cards[0].color === cards[1].color) &&
        (cards[1].color === cards[2].color) &&
        (cards[0].color === cards[2].color)) ||
       ((cards[0].color !== cards[1].color) &&
        (cards[1].color !== cards[2].color) &&
        (cards[0].color !== cards[2].color))) {
      return true;
    } else {
      return false;
    }
  }

  patternsSet(cards) {
    if (((cards[0].pattern === cards[1].pattern) &&
        (cards[1].pattern === cards[2].pattern) &&
        (cards[0].pattern === cards[2].pattern)) ||
       ((cards[0].pattern !== cards[1].pattern) &&
        (cards[1].pattern !== cards[2].pattern) &&
        (cards[0].pattern !== cards[2].pattern))) {
      return true;
    } else {
      return false;
    }
  }

  numbersSet(cards) {
    if (((cards[0].number === cards[1].number) &&
        (cards[1].number === cards[2].number) &&
        (cards[0].number === cards[2].number)) ||
       ((cards[0].number !== cards[1].number) &&
        (cards[1].number !== cards[2].number) &&
        (cards[0].number !== cards[2].number))) {
      return true;
    } else {
      return false;
    }
  }

  selectCard(e) {
    e.preventDefault();
    if (e.currentTarget.classList.contains('selected')) {
      selectedCards.forEach( (el, i) => {
        if (el.id === this.dataset.id) { selectedCards.splice(i, 1); }
      });
      e.currentTarget.classList.remove('selected');
    } else {
      e.currentTarget.classList.add("selected");
      setTimeout( () => {
        if (selectedCards.length !== 3) {
          const card = Object.assign({}, this.dataset);
          selectedCards.push(card);
          if (selectedCards.length === 3) { game.evaluateSet(selectedCards); }
        }
      }, 200);
    }
  }

  addPoints() {
    setScore += 1;
    document.getElementById('points').value = setScore;
  }

  deal(n) {
    currentBoard = [];
    const nArray = [];
    for (let i = 0; i < n; i++) {
      const card = this.deck.shift();
      currentBoard.push(card);
      nArray.push(card);
    }
    nArray.forEach( (card, i) => {
      const cardElement = this.createNewCard(card, i);
      document.getElementById(`card-${i+1}`).appendChild(cardElement);
    });
  }
}

class Deck {
  constructor() {
    const shapes = ['circle', 'square', 'diamond'];
    const colors = ['green', 'blue', 'orange'];
    const patterns = ['solid', 'stroke', 'striped'];
    const numbers = [1, 2, 3];

    this.cards = [];

    shapes.forEach( shape => (
      colors.forEach ( color => (
        patterns.forEach ( pattern => (
          numbers.forEach ( number => (
            this.cards.push( new Card(shape, color, pattern, number) )
          ))
        ))
      ))
    ));

    return shuffle(this.cards);
  }
}

class Card {
  constructor(shape, color, pattern, number) {
    this.id = `${shape}-${color}-${pattern}-${number}`;
    this.shape = shape;
    this.color = color;
    this.pattern = pattern;
    this.number = number;
  }
}

const game = new Game();
