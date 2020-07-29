import MainSlider from "./modules/slider/main-slider";
import MiniSlider from "./modules/slider/mini-slider";
import SecondPageSlider from "./modules/slider/second-page-slider";
import Player from "./modules/player";
import Difference from "./modules/difference";
import Form from "./modules/form";
import Collapse from "./modules/collapse";
import Download from "./modules/download";

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  const htmlPage = location.pathname.split("/").pop();

  if (htmlPage === "") {
    // default page scripts
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

    new Player(".overlay", ".showup .play").setup();

    new Difference(".officernew", ".officer__card-item").setup();
    new Difference(".officerold", ".officer__card-item").setup();
    new Form(".form").setup();
  } else if (htmlPage === "modules.html") {
    // second page scripts goes here
    const secondPageSlider = new SecondPageSlider({
      container: ".moduleapp",
      btns: ".next",
      prev: ".prevmodule",
      slideSelector: ".module",
    });
    secondPageSlider.setup();

    new Player(".overlay", ".module__video-item .play").setup();
    new Collapse(".module__info-show", ".msg").setup();
    new Download(".module__info-book", "assets/img/evolve.jpg").setup();
  }
});
