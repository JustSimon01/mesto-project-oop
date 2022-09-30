import { popupCloseButtons } from "./utils/constants.js";

export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._selector.classList.add("popup_opened");
  }

  close() {
    this._selector.classList.remove("popup_opened");
  }

  setEventListeners() {
    popupCloseButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", () => {
        this.close();
      });
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._selector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
