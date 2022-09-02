import {openPopup} from "./modal.js";
import {
  getInitialCards,
  deleteCard,
  putLikeCard,
  deleteLikeCard
} from "./api.js"

const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardTemplate = document.querySelector('#card-template').content;

// Карточки
function createCard(link, name, cardId, likeCount) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardHeading = cardElement.querySelector('.card__heading');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardLikeCount.textContent = likeCount;
  cardImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCaption.textContent = name;
  });
  cardHeading.textContent = name;
  cardLikeButton.addEventListener('click', (evt) => {
    putLikeCard(cardId)
    evt.target.classList.toggle('card__like-button_active');
  })
  cardDeleteButton.addEventListener('click', () => {
    const cardItem = cardDeleteButton.closest('.card');
    cardItem.remove();
    deleteCard(cardId);
  })

  return cardElement;
}

function renderCard(container, cardElement) {
  container.prepend(cardElement);
}

export {createCard, renderCard}
