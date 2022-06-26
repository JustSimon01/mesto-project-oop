import initialCards from "./cards.js";

const popupCloseButton = document.querySelectorAll('.popup__close-button'); // небольшой вопрос, можно ли
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const popupProfileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCards = document.querySelector('.popup_type_add-cards');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');
const formElementAddCards = popupAddCards.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const container = document.querySelector('.gallery');
const placeInput = formElementAddCards.querySelector('.popup__place');
const urlInput = formElementAddCards.querySelector('.popup__url');
const nameInput = formElementEditProfile.querySelector('.popup__name');
const jobInput = formElementEditProfile.querySelector('.popup__job');

// Модальное окно
// Открытие и закрытие модального окна
function switchPopup(item) {
  item.classList.toggle('popup_opened');
}

popupProfileEditButton.addEventListener('click', () => {
  switchPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});
popupProfileAddButton.addEventListener('click', () => {
  switchPopup(popupAddCards);
});
popupCloseButton.forEach(item => {
  item.addEventListener('click', () => {
    const popupClose = item.closest('.popup');
    switchPopup(popupClose);
  });
});

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  switchPopup(popupEditProfile);
}
formElementEditProfile.addEventListener('submit', submitProfileForm);

// Карточки
function createCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardHeading = cardElement.querySelector('.card__heading');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', () => {
    switchPopup(popupImage);
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCaption.textContent = name;
  });
  cardHeading.textContent = name;
  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  })
  cardDeleteButton.addEventListener('click', () => {
    const cardItem = cardDeleteButton.closest('.card');
    cardItem.remove();
  })

  return cardElement;
}

function renderCard(container, cardElement) {
  container.prepend(cardElement);
}

initialCards.forEach(item => {
  renderCard(container, createCard(item.link, item.name))
});

function addCard(evt) {
  evt.preventDefault();

  renderCard(container, createCard(urlInput.value, placeInput.value));

  urlInput.value = '';
  placeInput.value = '';

  switchPopup(popupAddCards);
}
formElementAddCards.addEventListener('submit', addCard);
