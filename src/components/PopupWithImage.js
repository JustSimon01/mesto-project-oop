import Popup from './Popup.js';
import {
  popupCardImage,
  popupCaption
} from './constants.js';

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
