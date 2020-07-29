export default class Download {
  constructor(mselector, path) {
    this.containers = document.querySelectorAll(mselector);
    this.path = path;
  }
  createAblock() {
    // there is in no <a> element is the html which can be used
    // for binding of download, so creating one
    const ablock = document.createElement("a");
    ablock.style.display = "none";
    ablock.setAttribute("href", this.path);
    ablock.setAttribute("download", "nice file");
    document.body.appendChild(ablock);
    return ablock;
  }
  setup() {
    this.containers.forEach((item) => {
      item
        .querySelector(":first-child")
        .nextElementSibling.addEventListener("click", () => {
          console.log("downloading file");
          const ablock = this.createAblock();
          ablock.click();
          document.body.removeChild(ablock);
        });
    });
  }
}
