import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardImage = document.querySelector('.popup__image');
    this._popupCaption = document.querySelector('.popup__caption');
  }

  open(item) {
    this._popupCardImage.src = item.link;
    this._popupCardImage.alt = item.name;
    this._popupCaption.textContent = item.name;

    super.open();
  }
}
