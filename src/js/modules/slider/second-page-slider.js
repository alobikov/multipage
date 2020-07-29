import Slider from "./slider";

export default class SecondPageSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  showNextSlide(step) {
    this.slides[this.currentIndex - 1].style.display = "none";
    this.currentIndex += step; // can be 0 or can be 9
    if (this.currentIndex < 1) {
      this.currentIndex = this.slides.length;
      console.log("first conditions executed", this.currentIndex);
    } else if (this.currentIndex > this.slides.length) {
      this.currentIndex = 1;
    }
    this.slides[this.currentIndex - 1].style.display = "block";
  }

  setup() {
    this.slides.forEach((slide) => (slide.style.display = "none"));
    this.slides[this.currentIndex - 1].style.display = "block";
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.showNextSlide(1);
      });
    });
    this.prev.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(this.currentIndex);
        this.showNextSlide(-1);
        console.log(this.currentIndex);
      });
    });
  }
}
