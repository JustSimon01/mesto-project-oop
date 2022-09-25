import Popup from "./Popup.js";
import Api from "./api";

export default class PopupWithForm extends Popup {
  constructor(selector /*, submitFormCallBack*/) {
    super(selector);
    // this._submitFormCallBack = submitFormCallBack;
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll(".popup__text");
    console.log(this._selector);
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    // возвращаем объект значений
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._selector.addEventListener("submit", (evt) => {
      //подстваляем api для отправки из submitFormCallBack
    });
  }

  /*
   Родительский setEventListeners нужно перезаписать,
   Метод setEventListeners класса PopupWithForm должен не только 
   добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  */

  /*
   Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  */
  //Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
}
