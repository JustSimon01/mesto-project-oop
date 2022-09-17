import {
  openPopup
} from "./modal.js";
import {api} from './index.js';

const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export default class Card {
  constructor(item, selector) {
    this._link = item.link;
    this._name = item.name;
    this._cardId = item._id;
    this._cardLike = item.likes.length;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _cardOpenImage() {
    openPopup(popupImage);
    popupCardImage.src = this._link;
    popupCardImage.alt = this._name;
    popupCaption.textContent = this._name;
  }

  _cardDeleteButton() {
    const cardItem = this._element.querySelector('.card__delete-button').closest('.card');
    api.deleteCard(this._cardId)
      .then(() => {
        cardItem.remove();
      })
      .catch(err => console.log(err));
  }

  _cardLikeButton(evt) {
    if (this._element.querySelector('.card__like-button').classList.contains('card__like-button_active')) {
      api.deleteLikeCard(this._cardId)
        .then(res => {
          this._element.querySelector('.card__like-count').textContent = res.likes.length;
          evt.target.classList.remove('card__like-button_active');
        })
        .catch(err => console.log(err));
    }
    if (!this._element.querySelector('.card__like-button').classList.contains('card__like-button_active')) {
      api.putLikeCard(this._cardId)
        .then(res => {
          this._element.querySelector('.card__like-count').textContent = res.likes.length;
          evt.target.classList.add('card__like-button_active');
        })
        .catch(err => console.log(err));
    }
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._cardOpenImage();
    })

    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._cardLikeButton(evt);
    })

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._cardDeleteButton();
    })
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__heading').textContent = this._name;
    this._element.querySelector('.card__like-count').textContent = this._cardLike;

    return this._element;
  }

}
