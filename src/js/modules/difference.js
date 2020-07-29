export default class Difference {
  constructor(containerSl, cardsSl) {
    const LIIT = 3; // how many cards to fit in view
    this.containerSl = document.querySelector(containerSl);
    this.cards = this.containerSl.querySelectorAll(cardsSl);
    this.lastCard = this.cards[this.cards.length - 1];
    this.currentIdx = 0;
    // console.log("cards", this.cards);
  }
  hideCards(cards) {
    cards.forEach((card) => {
      card.style.display = "none"; // hide all cards
      card.classList.add("animated", "fadeIn");
    });
    cards[this.cards.length - 1].style.display = "flex"; // show last card
  }
  /// returns new index
  addCardToView() {
    if (this.currentIdx !== this.cards.length - 2) {
      this.cards[this.currentIdx].style.display = "flex";
      this.currentIdx++;
    } else {
      this.cards[this.currentIdx].style.display = "flex";
      this.lastCard.style.display = "none";
    }
  }

  bindTriggers(trigger) {
    trigger.addEventListener("click", () => {
      this.addCardToView();
    });
  }

  setup() {
    this.bindTriggers(this.lastCard);
    this.hideCards(this.cards);
  }
}
