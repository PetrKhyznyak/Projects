export class Card {
  constructor(container, cardNumber, flip, open = false) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.flip = flip;
  }

  createElement() {
    const cardElement = document.createElement('div');
    const cardElementInner = document.createElement('div');
    const cardFace = document.createElement('img');
    const cardBack = document.createElement('img');
    cardBack.src = 'img/iconDefault.svg'
    switch (this.cardNumber) {
      case (1):
        cardFace.src = 'img/icon1.svg';
        break;
      case (2):
        cardFace.src = 'img/icon2.svg';
        break;
      case (3):
        cardFace.src = 'img/icon3.svg';
        break;
      case (4):
        cardFace.src = 'img/icon4.svg';
        break;
      case (5):
        cardFace.src = 'img/icon5.svg';
        break;
      case (6):
        cardFace.src = 'img/icon6.svg';
        break;
    }
    cardElement.classList.add('card-element');
    cardElementInner.classList.add('card-element__inner')
    cardFace.classList.add('card-face');
    cardBack.classList.add('card-back');
    cardElement.addEventListener('click', () => this.flip(this))
    cardElement.append(cardElementInner);
    cardElementInner.append(cardFace);
    cardElementInner.append(cardBack);
    this.container.append(cardElement);
    this.cardElement = cardElement;
    this.cardElementInner = cardElementInner;
    return cardElement;
  }

  set cardNumber(number) {
    this._cardNumber = number;
  }


  get cardNumber() {
    return this._cardNumber;
  }

  set open(isOpen) {
    this._open = isOpen;
    if (!this.cardElement)
      return;

    if(this.cardElementInner.classList.contains('open')) {
      setTimeout(() =>{
        this.cardElementInner.classList.toggle('open', isOpen);
      }, 800)
    } else {
      this.cardElementInner.classList.toggle('open', isOpen);
    }
  }

  get open() {
    return this._open;
  }

  set success(isSuccess) {
    this._success = isSuccess;
    if (!this.cardElement)
      return;
    this.cardElement.classList.toggle('success', isSuccess);
  }


  get success() {
    return this._success;
  }
}

export class StartBtn {
  createBtn() {
    const btn = document.createElement('btn');
    btn.classList = 'btn';
    btn.textContent = 'Начать заново';
    return btn
  }
}





