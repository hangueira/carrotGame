'use strict'

import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});



// Builder Patten
export class GameBuild {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  bulid() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    )
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) { 
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.stat = false;
    this.score = 0;
    this.timer = undefined;

    // button event handling
    this.gameBtn.addEventListener('click', () => {
      if(this.stat) {
        this.stop();
      } else {
        this.start(); 
      }
    });
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  onItemClick = (item) => {
    if(!this.stat) {
      return;
    } 
    if(item === 'carrot') {
      this.score++;
      this.updateScoreBoard();
      if(this.score == this.carrotCount) {
        this.finish(true);
      }
    } else if(item === 'bug') {
      this.finish(false);
    }
  }

  start() {
    this.stat = true;
    this.score = 0;
    sound.playBackground();
    this.initGame();
    this.showStopIcon();
    this.showTimerAndScore();
    this.startGameTimer();
  }
  
  stop() {
    this.stat = false
    this.showStartIcon();
    this.stopGameTimer();
    this.invisibleGameBtn();
    this.onGameStop && this.onGameStop(Reason.cancel);
  }

  finish(win) {
    this.invisibleGameBtn();
    if(win) {
      sound.playWin();
    } else {
      sound.playAlert();
    }
    sound.pauseBackground();
    this.stopGameTimer();
    this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);
  }

  showStopIcon() {
    const gameIcon = this.gameBtn.querySelector('.fas');
    gameIcon.classList.add('fa-stop');
    gameIcon.classList.remove('fa-play');
  }

  showStartIcon() {
    const gameIcon = this.gameBtn.querySelector('.fas');
    gameIcon.classList.add('fa-play');
    gameIcon.classList.remove('fa-stop');
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let reminingTimeSec = this.gameDuration;
    this.updateTimeText(reminingTimeSec);
    this.timer = setInterval(() => {
      if(reminingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
      } else {
        this.updateTimeText(--reminingTimeSec);
      }
    }, 1000);
  }

  updateTimeText(sec) {
    const minute = Math.floor(sec / 60);
    const seconds = sec % 60;
    this.gameTimer.innerText = `${minute} : ${seconds}`;
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  invisibleGameBtn() {
    this.gameBtn.style.visibility = 'hidden';
  }

  visibleGameBtn() {
    this.gameBtn.style.visibility = 'visible';
    this.gamePopUp.classList.add('pop-up--hide');
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    const tempScore = this.carrotCount - this.score;
    this.gameScore.innerText = tempScore;
  }
}