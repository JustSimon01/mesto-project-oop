import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitFormCallBack }) {
    super(popupSelector);
    this._submitFormCallBack = submitFormCallBack;
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__text");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._submitFormCallBack(this._getInputValues());
      //подстваляем api для отправки из submitFormCallBack
    });
  }

  setInactiveButton(buttonElement, selectorClass) {
    const submitButton = this._popup.querySelector(buttonElement);
    submitButton.classList.add(selectorClass);
    submitButton.setAttribute("disabled", "disabled");
  }

  setActiveButton(buttonElement, selectorClass) {
    const submitButton = this._popup.querySelector(buttonElement);
    submitButton.classList.remove(selectorClass);
    submitButton.removeAttribute("disabled");
  }

  loading(isLoading) {
    if (isLoading) {
      this._popup.querySelector(".popup__save-button").value =
        "Сохранить...";
    } else {
      this._popup.querySelector(".popup__save-button").value = "Сохранить";
    }
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}
