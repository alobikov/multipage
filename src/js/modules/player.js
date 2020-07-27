export default class Player {
  constructor(selector, triggers) {
    this.overlay = document.querySelector(selector);
    this.btns = document.querySelectorAll(triggers);
    this.closeBtn = this.overlay.querySelector(".close");

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  startPlayer(url) {
    if (document.querySelector("iframe#frame")) {
      console.log("exists");
      //   this.player.playVideo();
    } else {
      this.player = new YT.Player("frame", {
        height: "390",
        width: "640",
        videoId: url,
      });
    }
    // player.playVideo();
  }

  stopPlayer() {
    console.log(this.player);
    this.player.stopVideo();
  }

  bindOpen(btns) {
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.overlay.style.display = "flex";
        // url video is located in data-url attribute of the button
        const url = btn.getAttribute("data-url");
        this.startPlayer(url);
      });
    });
  }

  bindClose(btn) {
    btn.addEventListener("click", () => {
      this.stopPlayer();
      this.overlay.style.display = "none";
    });
  }

  setup() {
    this.bindOpen(this.btns);
    this.bindClose(this.closeBtn);
  }
}
