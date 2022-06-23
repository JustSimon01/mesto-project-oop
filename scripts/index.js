const closeButton = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCards = document.querySelector('.popup_type_add-cards');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');
const formElementAddCards = popupAddCards.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Модальное окно
// Открытие и закрытие модального окна
function popupSwitch(item) {
  item.classList.toggle('popup_opened');
}

editButton.addEventListener('click', popupSwitch.bind(editButton, popupEditProfile));
addButton.addEventListener('click', popupSwitch.bind(addButton, popupAddCards));
closeButton.forEach(item => {
  item.addEventListener('click', () => {
    const popupClose = item.closest('.popup');
    popupSwitch(popupClose);
  });
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  const nameInput = formElementEditProfile.querySelector('.popup__name');
  const jobInput = formElementEditProfile.querySelector('.popup__job');
  const profileName = document.querySelector('.profile__name');
  const profileOccupation = document.querySelector('.profile__occupation');

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  popupSwitch(popupEditProfile);
}
formElementEditProfile.addEventListener('submit', formSubmitHandler);

// Карточки
function cardTemplate(link, name) {
  const gallery = document.querySelector('.gallery');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardHeading = cardElement.querySelector('.card__heading');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', () => {
    popupSwitch(popupImage);
    popupCardImage.src = link;
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

  gallery.prepend(cardElement);
}

initialCards.forEach(item => cardTemplate(item.link, item.name));

function addCard(evt) {
  evt.preventDefault();

  const placeInput = formElementAddCards.querySelector('.popup__place');
  const urlInput = formElementAddCards.querySelector('.popup__url');

  cardTemplate(urlInput.value, placeInput.value);

  urlInput.value = '';
  placeInput.value = '';

  popupSwitch(popupAddCards);
}
formElementAddCards.addEventListener('submit', addCard);
