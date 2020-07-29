export default class Form {
  constructor(formSl) {
    this.forms = document.querySelectorAll(formSl);
    this.messageBlock;
    this.message = {
      loading: "The data is loadding...",
      success: "Will get in contact with you ASAP",
      failure: "Something went wrong, please try later",
    };
    this.path = "assets/question.php";
    this.inputs = document.querySelectorAll("input");
  }

  async postData(url, data) {
    let res = await fetch(url, {
      body: data,
      method: "POST",
    });
    return await res.text();
  }

  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    };

    function createMask(event) {
      let matrix = "+1 (___) ___-____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });

      if (event.type === "blur") {
        if (this.value.length == 2) {
          this.value = "";
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach((input) => {
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    });
  }

  createMessageBlock(node) {
    const existingMessage = node.parentNode.querySelector(".post-message");
    existingMessage ? existingMessage.remove() : null;
    this.messageBlock = document.createElement("div");
    node.parentNode.appendChild(this.messageBlock);
    this.messageBlock.classList.add("post-message");
    this.messageBlock.style.cssText = `
        color: darksalmon;
        font-size: 19px;
        margin-top: 2rem;`;
  }

  chargeCheckMailInputAddress(input) {
    input.addEventListener("keypress", (e) => {
      if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
        e.preventDefault();
      }
    });
  }

  setup() {
    this.initMask();
    this.forms.forEach((form) => {
      const mailInput = form.querySelector('[type="email"]');
      this.chargeCheckMailInputAddress(mailInput);
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("submit");
        this.createMessageBlock(form);
        this.messageBlock.textContent = this.message.loading;
        const data = new FormData(form);
        this.postData(this.path, data)
          .then((resp) => {
            console.log(resp);
            this.messageBlock.textContent = this.message.success;
            console.log(this.messageBlock);
          })
          .catch(() => (this.messageBlock.textContent = this.message.failure))
          .finally(() => {
            setTimeout(() => {
              this.messageBlock.remove();
            }, 6000);
          });
      });
    });
  }
}
