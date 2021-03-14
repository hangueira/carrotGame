'use strict'

import PopUp from './popup.js';
import { GameBuild, Reason } from './game.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new GameBuild()
.gameDuration(5)
.carrotCount(2)
.bugCount(3)
.bulid();

game.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.win:
      message = 'YOU WON !!!'
      break;
    case Reason.lose:
      message = 'YOU LOST ㅠㅠ'
      break;
    case Reason.cancel:
      message = 'CANCEL !!!'
      break;
    default:
      throw new Error ('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});



