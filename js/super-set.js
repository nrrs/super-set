// import Card from './card';


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

  deal() {
    const board = document.getElementById('board');

    this.shuffle(this.cards).forEach( (card, i) => {
      const currentCardclass = (card.value());
      const cardElement = document.createElement('div');
      cardElement.setAttribute('data-id', i);
      cardElement.className += ('card');

      const cardElementChild = document.createElement('div');
      cardElementChild.className += (`${currentCardclass}`);

      cardElement.appendChild(cardElementChild);
      console.log(cardElement);
      board.appendChild(cardElement);
      console.log(card);
    });
    return(
      this.cards.length
    );
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



const deck = new Deck();

console.log(deck.deal());
