'use strict'

/**
 * 1. 이미지를 넣을 section의 정보를 가져온다.
 * 2. addItem 함수 만들고..
 * 3. randomNumber 만들어서 계산하자... 
 */
const IMG_SIZE = 80;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

function initGame() {
  addItem('carrot', 5, '/img/carrot.png');
  addItem('bug', 5, '/img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - IMG_SIZE;
  const y2 = fieldRect.height - IMG_SIZE;

  for(let i = 0; i < count ; i++){
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

initGame();