import {
  openPopup
} from "./modal.js";

const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardTemplate = document.querySelector('#card-template').content;
const selector = '#card-template';

/*класс Card
const newCards = new Card({link, name, ...}, selector)
*/

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
