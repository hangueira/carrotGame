'use strict'

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMsg = document.querySelector('.pop-up__message');
    this.popUpRetry = document.querySelector('.pop-up__retry');
    this.popUpRetry.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }
  // onClick으로 함수의 참조값을 받아와서 멤버변수 this.onClick에 저장
  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUp.classList.remove('pop-up--hide');
    this.popUpMsg.innerText = text;
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }
}