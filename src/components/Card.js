import {api} from './index.js';

export default class Card {
  constructor(item, selector, idUser, {handleCardClick}) {
    this._link = item.link;
    this._name = item.name;
    this._cardId = item._id;
    this._cardLike = item.likes;
    this._selector = selector;
    this._cardOwnerId = item.owner._id;
    this._idUser = idUser;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _cardDeleteButton() {
    const cardItem = this._element.querySelector('.card__delete-button');
    api.deleteCard(this._cardId)
      .then(() => {
        cardItem.closest('.card').remove();
      })
      .catch(err => console.log(err));
  }

  _setDeleteButtons(){
    if (this._idUser === this._cardOwnerId){
      this._element.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
    }
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

  _setLikeButtons() {
    this._cardLike.forEach(element => {
      if (element._id === this._idUser){
        this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
      }
    });
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
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
    this._setDeleteButtons();
    this._setLikeButtons();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__heading').textContent = this._name;
    this._element.querySelector('.card__like-count').textContent = this._cardLike.length;

    return this._element;
  }

}
