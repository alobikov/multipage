import MainSlider from "./modules/slider/main-slider";
import MiniSlider from "./modules/slider/mini-slider";
import Player from "./modules/player";
import Difference from "./modules/difference";

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  const mainSlider = new MainSlider({ container: ".page", btns: ".next" });
  mainSlider.render();

  const showupSlider = new MiniSlider({
    container: ".showup__content-slider",
    next: ".showup__next",
    prev: ".showup__prev",
    slideSelector: "a.card",
    activeClass: "card-active",
    animate: true,
  });
  showupSlider.setup();

  const modulesSlider = new MiniSlider({
    container: ".modules__content-slider",
    next: ".modules__info-btns .slick-next",
    prev: ".modules__info-btns .slick-prev",
    slideSelector: "a.card",
    activeClass: "card-active",
    animate: true,
    autoplay: true,
  });
  modulesSlider.setup();

  const feedSlider = new MiniSlider({
    container: ".feed__slider",
    next: ".feed__slider .slick-next",
    prev: ".feed__slider .slick-prev",
    slideSelector: "div.feed__item",
    activeClass: "feed__item-active",
  });
  feedSlider.setup();

  const player = new Player(".overlay", ".showup .play");
  player.setup();
  new Difference(".officernew", ".officer__card-item").setup();
  new Difference(".officerold", ".officer__card-item").setup();
});
