const gameWinSound = new Audio('/sound/game_win.mp3');
const bugPullSound = new Audio('/sound/bug_pull.mp3');
const carrotPullSound = new Audio('/sound/carrot_pull.mp3');
const alertSound = new Audio('/sound/alert.wav');
const bgSound = new Audio('/sound/bg.mp3');

export function playCarrot() {
  playSound(carrotPullSound);
}

export function playbug() {
  playSound(bugPullSound);
}

export function playWin() {
  playSound(gameWinSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playBackground() {
  playSound(bgSound);
}


export function pauseBackground() {
  pauseSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound) {
  sound.pause();
}