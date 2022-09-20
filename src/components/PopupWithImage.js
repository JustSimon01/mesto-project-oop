import Popup from './Popup.js';
const popupCardImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export default class PopupWithImage extends Popup {
  constructor(item, selector) {
    super(selector);
    this._link = item.link;
    this._name = item.name;
  }

  open() {
    popupCardImage.src = this._link;
    popupCaption.textContent = this._name;
    super.open();
  }
}
