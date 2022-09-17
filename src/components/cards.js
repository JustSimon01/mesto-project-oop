import {
  openPopup
} from "./modal.js";
import {
  api
} from "./index.js";

const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardTemplate = document.querySelector('#card-template').content;
const selector ='#card-template';

/*класс Card
const newCards = new Card({link, name, ...}, selector)
*/
class Card {
  constructor({
    link,
    name,
    cardId
  }, selector) {
    this._link = link;
    this._name = name;
    this._cardId = cardId;
    this._selector = selector;
  }

  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
      const cardImage = cardElement.querySelector('.card__image');
      const cardHeading = cardElement.querySelector('.card__heading');
      const cardLikeButton = cardElement.querySelector('.card__like-button');
      const cardDeleteButton = cardElement.querySelector('.card__delete-button');
      const cardLikeCount = cardElement.querySelector('.card__like-count');
      cardImage.src = link;
      cardImage.alt = name;
      cardHeading.textContent = name;
      cardLikeCount.textContent = '0';
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__heading').textContent = this._name;


    return this._element;
  }

  _cardLikeButton() {

    this._element.querySelector('.card__like-count').textContent = this._likes.length;
    api.putLikeCard(this._cardId).then();
  }

  _cardDeleteButton() {

  }

  _setEventListeners() {
    addEventListener('click', () => {
      this._cardLikeButton();
    })

    addEventListener('click', () => {
      this._cardDeleteButton();
    })
  }

}

// Карточки
// Принимает в конструктор её данные и селектор её template-элемента; (data, selector)
// idпользователя
function createCard(link, name, cardId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardHeading = cardElement.querySelector('.card__heading');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = link;
  cardImage.alt = name;
  cardHeading.textContent = name;
  cardLikeCount.textContent = '0';

  cardImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCaption.textContent = name;
  });

  cardLikeButton.addEventListener('click', (evt) => {
    if (cardLikeButton.classList.contains('card__like-button_active')) {
      api.deleteLikeCard(cardId)
        .then(res => {
          cardLikeCount.textContent = res.likes.length;
          evt.target.classList.remove('card__like-button_active');
        })
        .catch(err => console.log(err));
    }
    if (!cardLikeButton.classList.contains('card__like-button_active')) {
      api.putLikeCard(cardId)
        .then(res => {
          cardLikeCount.textContent = res.likes.length;
          evt.target.classList.add('card__like-button_active');
        })
        .catch(err => console.log(err));
    }
  })

  cardDeleteButton.addEventListener('click', () => {
    const cardItem = cardDeleteButton.closest('.card');
    api.deleteCard(cardId)
      .then(() => {
        cardItem.remove();
      })
      .catch(err => console.log(err));
  })

  return cardElement;
}

function renderCard(container, cardElement) {
  container.prepend(cardElement);
}

export {
  createCard,
  renderCard
}
