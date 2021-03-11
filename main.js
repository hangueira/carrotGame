'use strict'

/**
 * 1. 이미지를 넣을 section의 정보를 가져온다.
 * 2. addItem 함수 만들고..
 * 3. randomNumber 만들어서 계산하자... 
 */
const IMG_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gamePopUp = document.querySelector('.pop-up');
const gamePopUpMsg = document.querySelector('.pop-up__message');
const gamePopUpRetry = document.querySelector('.pop-up__retry');

const gameWinSound = new Audio('/sound/game_win.mp3');
const bugPullSound = new Audio('/sound/bug_pull.mp3');
const carrotPullSound = new Audio('/sound/carrot_pull.mp3');
const alertSound = new Audio('/sound/alert.wav');
const bgSound = new Audio('/sound/bg.mp3');

let gameStat = false;
let score = 0;
let timer = undefined;

// button event handling
gameBtn.addEventListener('click', () => {
  if(gameStat) {
    stopGame();
  } else {
    startGame(); 
  }
});

gamePopUpRetry.addEventListener('click', ()=> {
  reset();
  startGame();
  visibleGameBtn();
});

field.addEventListener('click', (event)=> {
  onFieldClick(event);
});


function startGame() {
  gameStat = true;
  playSound(bgSound);
  initGame();
  showStopIcon();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  gameStat = false
  showStartIcon();
  stopGameTimer();
  invisibleGameBtn();
  showPopUpBtn('Retry ^_^?');
}

function showStopIcon() {
  const gameIcon = gameBtn.querySelector('.fas');
  gameIcon.classList.add('fa-stop');
  gameIcon.classList.remove('fa-play');
}

function showStartIcon() {
  const gameIcon = gameBtn.querySelector('.fas');
  gameIcon.classList.add('fa-play');
  gameIcon.classList.remove('fa-stop');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let reminingTimeSec = GAME_DURATION_SEC;
  updateTimeText(reminingTimeSec);
  timer = setInterval(() => {
    if(reminingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
    } else {
      updateTimeText(--reminingTimeSec);
    }
  }, 1000);
}

function updateTimeText(sec) {
  const minute = Math.floor(sec / 60);
  const seconds = sec % 60;
  gameTimer.innerText = `${minute} : ${seconds}`;
}

function stopGameTimer() {
  clearInterval(timer);
}

function invisibleGameBtn() {
  gameBtn.style.visibility = 'hidden';
}

function visibleGameBtn() {
  gameBtn.style.visibility = 'visible';
  gamePopUp.classList.add('pop-up--hide');

}

function showPopUpBtn(text) {
  gamePopUp.classList.remove('pop-up--hide');
  gamePopUpMsg.innerText = `${text}`;
}

function initGame() {
  field.innerHTML = ''; 
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, '/img/carrot.png');
  addItem('bug', BUG_COUNT, '/img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - IMG_SIZE;
  const y2 = fieldRect.height - IMG_SIZE;

  for(let i = 0; i < count ; i++) {
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

function onFieldClick(event) {
  if(!gameStat) {
    return;
  } 
  const target = event.target;
  if(target.matches('.carrot')) {
    target.remove();
    score++;
    updateScoreBoard();
    if(score == CARROT_COUNT) {
      finishGame(true);
    }
    playSound(carrotPullSound);
  } else if(target.matches('.bug')) {
    stopGameTimer();
    finishGame(false);
    playSound(bugPullSound);
  }
}

function playSound(sound) {
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}

function finishGame(win) {
  invisibleGameBtn();
  showPopUpBtn(win ? 'YOU WIN ^__^' : 'YOU LOSE ㅠ_ㅠ' );
  if(win) {
    playSound(gameWinSound);
  } else {
    playSound(alertSound);
    
  }
  pauseSound(bgSound);
  stopGameTimer();
}

function updateScoreBoard() {
  const tempScore = CARROT_COUNT - score;
  gameScore.innerText = tempScore;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function reset() {
  score = 0;
  gameStat = true;
}