import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitFormCallBack }) {
    super(popupSelector);
    this._submitFormCallBack = submitFormCallBack;
    this._inputList = this._popup.querySelectorAll(".popup__text");
    this._popupForm = this._popup.querySelector(".popup__form");
    this._saveButton = this._popup.querySelector(".popup__save-button");
    // фиксируем начальный текст кнопки 1 раз в конструкторе
    this._submitBtnText = this._saveButton.value;
  }

  _getInputValues() {
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
      this._submitFormCallBack(this._getInputValues());
      //подстваляем api для отправки из submitFormCallBack
    });
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      console.log(this._submitBtnText);
      this._saveButton.value = loadingText;
    } else {
      this._saveButton.value = this._submitBtnText;
    }
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
