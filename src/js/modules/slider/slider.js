export default class Slider {
  constructor({
    container = null,
    btns = null,
    prev = null,
    next = null,
    activeClass = "",
    slideSelector = ".slide-item",
    animate,
    autoplay = false,
  } = {}) {
    this.container = document.querySelector(container);
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.slideSelector = slideSelector;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slides = this.container.querySelectorAll(this.slideSelector);
    console.log("slides", this.slides);
    console.log(this.container);
    console.log(this.slides);
    console.log(this.prev);
    this.currentIndex = 1;
  }
}
