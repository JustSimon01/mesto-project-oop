const popup = document.querySelector('.popup');
const closeButton = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCards = document.querySelector('.popup-add-cards');
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
// Открытие модального окна
function popupOpened(self) {
  self.classList.toggle('popup_opened');
}

// Закрытие модального окна
function popupClosed(self) {
  self.classList.toggle('popup_opened');
}

editButton.addEventListener('click', popupOpened.bind(editButton, popupEditProfile));
addButton.addEventListener('click', popupOpened.bind(addButton, popupAddCards));
closeButton[0].addEventListener('click', popupClosed.bind(closeButton, popupEditProfile));
closeButton[1].addEventListener('click', popupClosed.bind(closeButton, popupAddCards));

const formElementEditProfile = popupEditProfile.querySelector('.popup__form');

function formSubmitHandler(evt) {
  evt.preventDefault();
  const nameInput = formElementEditProfile.querySelector('.popup__name');
  const jobInput = formElementEditProfile.querySelector('.popup__job');
  const profileName = document.querySelector('.profile__name');
  const profileOccupation = document.querySelector('.profile__occupation');

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  popupClosed(popupEditProfile);
}

formElementEditProfile.addEventListener('submit', formSubmitHandler);

// Карточки
//
function cardTemplate(link, name) {
  const gallery = document.querySelector('.gallery');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = link;
  cardElement.querySelector('.card__heading').textContent = name;
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  })
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    const listItem = cardElement.querySelector('.card__delete-button').closest('.card');
    listItem.remove();
  })

  gallery.prepend(cardElement);
}

initialCards.forEach((item) => {
  cardTemplate(item.link, item.name);
})

const formElementAddCards = popupAddCards.querySelector('.popup__form');

function addCard(evt) {
  evt.preventDefault();

  const placeInput = formElementAddCards.querySelector('.popup__place');
  const urlInput = formElementAddCards.querySelector('.popup__url');
  cardTemplate(urlInput.value, placeInput.value);

  urlInput.value = '';
  placeInput.value = '';
  popupClosed(popupAddCards);
}

formElementAddCards.addEventListener('submit', addCard);
