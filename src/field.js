'use strict'

import * as sound from './sound.js';

const IMG_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerHTML = ''; 
    this._addItem('carrot', this.carrotCount, '/img/carrot.png');
    this._addItem('bug', this.bugCount, '/img/bug.png');
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - IMG_SIZE;
    const y2 = this.fieldRect.height - IMG_SIZE;
  
    for(let i = 0; i < count ; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  // this binding 처리
  // 1. onClick(event) 이걸 onClick = (event) =>  이걸로 변경하여 바인딩처리한다.
  onClick = (event) => {
    const target = event.target;
    if(target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if(target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
      sound.playbug();
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}