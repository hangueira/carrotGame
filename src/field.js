'use strict'

export default class Field() {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = field.getBoundingClientRect();
    field.addEventListener('click', this.onClick);
  }
  


}