export default class Collapse {
  constructor(triggers, selector) {
    this.btns = document.querySelectorAll(triggers);
    this.msgSelector = selector;
  }

  setup() {
    this.btns.forEach((btn) => {
      const msgElm = btn.nextElementSibling;
      msgElm.classList.add("animated", "fadeIn");
      btn.addEventListener("click", () => {
        console.log(btn);
        if (msgElm.style.display === "flex") {
          msgElm.style.display = "none";
        } else {
          msgElm.style.display = "flex";
        }
      });
    });
  }
}
