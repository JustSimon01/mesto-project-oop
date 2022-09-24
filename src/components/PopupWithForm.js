import Popup from "./Popup.js";
import Api from "./api";

export default class PopupWithForm extends Popup {
  constructor(selector, submitFormCallBack) {
    super(selector);
    this._submitFormCallBack = submitFormCallBack;
  }

  _getInputValues() {}

  _setEventListeners() {
    super._setEventListeners();
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
