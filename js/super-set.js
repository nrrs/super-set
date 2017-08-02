// import Card from './card';
let selectedCards = [];
let recycleCards = [];
let currentBoard = [];

window.recycleCards =  recycleCards;

class Game {

  constructor() {
    const deck = new Deck();
    this.deck = deck;
    this.deal(12, deck);
  }

  evaluateSet(cards) {
    if ( game.shapeSet(cards) &&
        game.colorsSet(cards) &&
        game.patternsSet(cards) &&
        game.numbersSet(cards) ) {

      game.addPoints();
      this.flash('success', 'Valid Set!').then(
        cards.forEach ( (card, i) => {
          const bye = document.querySelector(`[data-combo-id='${cards[i].comboId}']`);
          const drawn = game.deck.shift();
          const newCard = game.createNewCard(drawn, i);
          bye.parentNode.replaceChild(newCard, bye);
        })
      );

    } else {
      this.flash('error', 'Not a valid set!');
    }

    selectedCards = [];

  }

  flash(type, message) {
    const body = document.getElementById('alerts');

    if (type === 'success') {
      body.classList.add('success');
    } else {
      body.classList.add('error');
    }
    setTimeout(() => body.classList.remove('error'), 500);
    setTimeout(() => body.classList.remove('success'), 500);
  }

  createNewCard(card, i) {
    const cardElement = document.createElement('div');
    const cardElementChildContainer = document.createElement('div');

    cardElement.setAttribute('data-combo-id', `combo-${i}`);
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
      cardElementChild.className += (`shape ${card.shape} ${card.color} ${card.pattern} ${card.number}`);
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
      console.log('shape set');
      return true;
    } else {
      console.log('not a shape set');
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
      console.log('colors set');
      return true;
    } else {
      console.log('not a colors set');
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
      console.log('patterns set');
      return true;
    } else {
      console.log('not a patterns set');
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
      console.log('numbers set');
      return true;
    } else {
      console.log('not a numbers set');
      return false;
    }
  }

  showAlert(message) {
    const alertBox = document.getElementById('alerts');
    alertBox.classList.add('bounceInDown', 'animated');
    alertBox.innerHTML = `${message}`;
    // setTimeout(game.clearAlert, 750);
    setTimeout(() => {
      alertBox.classList.remove('bounceInDown', 'animated');
      alertBox.classList.add('bounceOutUp', 'animated');
    }, 750);
  }
  clearAlert() {
    const alertBox = document.getElementById('alerts');
    alertBox.classList.remove('bounceInDown', 'animated');
    alertBox.classList.add('bounceOutUp', 'animated');
    alertBox.innerHTML = '';
  }

  selectCard(e) {
    e.preventDefault();

    if (e.currentTarget.classList.contains('selected')) {
      game.showAlert('Already Selected, choose another!');
    } else {
      e.currentTarget.classList.toggle("selected");
      setTimeout( () => {
        if (selectedCards.length !== 3) {
          const card = Object.assign({}, this.dataset);
          selectedCards.push(card);

          if (selectedCards.length === 3) {
            const arr = document.querySelectorAll('.selected');
            arr.forEach(el => {
              el.classList.remove('selected');
            });
            game.evaluateSet(selectedCards);
          }
        }
      }, 200);
    }

    console.log(selectedCards);
  }

  addPoints() {
    const points = document.getElementById('points').value;
    document.getElementById('points').value = parseInt(points) + 1;
  }

  deal(n, deck) {
    const nArray = [];

    for (let i = 0; i < n; i++) {
      const tempItem = deck.pop();
      recycleCards.push(tempItem);
      currentBoard.concat(recycleCards);
      nArray.push(tempItem);
    }

    nArray.forEach( (card, i) => {
      const gridItem = document.getElementById(`card-${i+1}`);

      const currentCardclass = (card.value());
      const cardElement = document.createElement('div');
      const cardElementChildContainer = document.createElement('div');

      cardElement.setAttribute('data-combo-id', `combo-${i}`);
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
        cardElementChild.className += (`shape ${currentCardclass}`);
        cardElementChildContainer.appendChild(cardElementChild);
      }

      gridItem.appendChild(cardElement);
    });
  }
}

class Deck {
  constructor() {
    const shapes = ['circle', 'square', 'diamond'];
    const colors = ['green', 'blue', 'grey'];
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

    return this.shuffle(this.cards);
  }

  shuffle(cards) {
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
}

class Card {
  constructor(shape, color, pattern, number) {
    this.shape = shape;
    this.color = color;
    this.pattern = pattern;
    this.number = number;
  }

  value() {
    return (
      `${this.shape} ${this.color} ${this.pattern} ${this.number}`
    );
  }
}



const game = new Game();
