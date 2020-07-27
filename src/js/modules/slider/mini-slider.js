import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, prev, next, active, animate, autoplay) {
    super(container, next, prev, active, animate, autoplay);
    console.log("Constructor of MiniSlider here!");
  }
  decorateSlide() {
    console.log("decoreteSlide:", this.container);
    // first remove active class from all slides
    this.slides.forEach((slide) => {
      console.log("slide in decorize:", slide);
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = 0.4;
        slide.querySelector(".card__controls-arrow").style.opacity = 0;
      }
    });
    // now set active class to slides[0]
    this.slides.item(0).classList.add(this.activeClass);
    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = 1;
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = 1;
    }
  }

  setIntervalPlay() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  nextSlide() {
    this.container.appendChild(this.slides[0]);
    console.log("moving slide", this.slides);
    this.slides = this.container.querySelectorAll(this.slideSelector);
    this.decorateSlide();
  }
  setup() {
    // first let's make all slides visible
    this.container.style.cssText = `
                                    display : flex;
                                    flex-wrap : wrap;
                                    overflow : hidden;
                                    align-items : flex-start;`;

    // now let's arrange slides rotation onclick
    this.next.addEventListener("click", () => this.nextSlide());
    this.prev.addEventListener("click", (e) => {
      e.preventDefault();
      let active = this.slides[this.slides.length - 1];
      this.container.insertBefore(active, this.slides[0]);
      this.slides = this.container.querySelectorAll(this.slideSelector);
      this.decorateSlide();
    });
    this.decorateSlide();
    if (this.autoplay) {
      this.setIntervalPlay();
      this.container.addEventListener("mouseover", () => {
        clearInterval(this.interval);
      });
      this.container.addEventListener("mouseleave", () => {
        this.setIntervalPlay();
      });
    }
  }
}
