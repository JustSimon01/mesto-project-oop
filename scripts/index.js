const popup = document.querySelector('.popup');
const closeButton = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCards = document.querySelector('.popup-add-cards');

// Модальное окно
// Открытие модального окна
function popupOpened(self) {
  self.classList.add('popup_opened');
}

// Закрытие модального окна
function popupClosed(self) {
  self.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpened.bind(editButton, popupEditProfile));
addButton.addEventListener('click', popupOpened.bind(addButton, popupAddCards));
closeButton[0].addEventListener('click', popupClosed.bind(closeButton, popupEditProfile));
closeButton[1].addEventListener('click', popupClosed.bind(closeButton, popupAddCards));

const formElement = popupEditProfile.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__job');

function formSubmitHandler(evt) {
  evt.preventDefault();
  const profileName = document.querySelector('.profile__name');
  const profileOccupation = document.querySelector('.profile__occupation');

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  popupClosed(popupEditProfile);
}

formElement.addEventListener('submit', formSubmitHandler);
