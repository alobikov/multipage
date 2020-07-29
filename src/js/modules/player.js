export default class Player {
  constructor(selector, triggers) {
    this.overlay = document.querySelector(selector);
    this.btns = document.querySelectorAll(triggers);
    console.log("btns", this.btns);
    this.closeBtn = this.overlay.querySelector(".close");

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  enableSecondVideo() {
    const inactiveVideo = this.activeBtn.closest(".module__video-item")
      .nextElementSibling;
    const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

    if (
      inactiveVideo.querySelector(".play__circle").classList.contains("closed")
    ) {
      inactiveVideo.querySelector(".play__circle").appendChild(playBtn);
      inactiveVideo.style.opacity = "1";
      inactiveVideo.style.filter = "none";
      inactiveVideo.querySelector(".play__circle").classList.remove("closed");
      inactiveVideo.querySelector("svg").remove();
      inactiveVideo.querySelector(".play__text").textContent = "play video";
      inactiveVideo.querySelector(".play__text").classList.remove("attention");
    }
  }

  onPlayerStateChange(event) {
    if (event.data === 0) {
      // video end reached
      this.enableSecondVideo();
    }
  }

  startPlayer(url) {
    if (document.querySelector("iframe#frame")) {
      console.log("exists");
      this.player.loadVideoById(url);
      //   this.player.playVideo();
    } else {
      this.player = new YT.Player("frame", {
        height: "390",
        width: "640",
        videoId: url,
        events: {
          onStateChange: this.onPlayerStateChange,
        },
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
        this.activeBtn = btn;
        const isClosed = btn
          .querySelector(".play__circle")
          .classList.contains("closed");

        if (!isClosed) {
          this.overlay.style.display = "flex";
          // url video is located in data-url attribute of the button
          const url = btn.getAttribute("data-url");
          console.log("player open:", url);
          this.startPlayer(url);
        }
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
    if (this.btns.length > 0) {
      this.bindOpen(this.btns);
      this.bindClose(this.closeBtn);
    }
  }
}
