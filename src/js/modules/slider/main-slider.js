import Slider from "./slider";

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
    this.slides = this.container.children;
    console.log("Main_slider: ", this.slides, this.container);
  }
  delayShow(selector, timeout) {
    const card = document.querySelector(selector);
    card.style.display = "none";
    card.classList.add("animated", "fadeInUp");
    setTimeout(() => {
      card.style.display = "block";
    }, timeout);
  }
  /// show slide by its index
  showSlide(n) {
    console.log(this.currentIndex);
    // first take care about boundary cases
    if (n < 1) {
      this.currentIndex = this.slides.length;
    }
    if (n > this.slides.length) {
      this.currentIndex = 1;
    }
    // hide all slides
    this.slides.forEach((item) => (item.style.display = "none"));
    // show slide
    this.slides[this.currentIndex - 1].style.display = "block";
  }
  /// advance slide forward or backward
  /// - 1 is used because array indexed from 0
  plusSlide(step) {
    this.currentIndex += step;
  }

  render() {
    this.showSlide(this.currentIndex);
    this.btns.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.plusSlide(1);
        if (this.currentIndex === 3) {
          this.delayShow(".hanson", 3000);
        }
        this.showSlide(this.currentIndex);
      });
      item.parentNode.previousElementSibling.addEventListener("click", (e) => {
        e.preventDefault();
        this.currentIndex = 1;
        this.showSlide(this.currentIndex);
      });
    });
  }
}
