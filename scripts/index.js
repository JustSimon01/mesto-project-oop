import initialCards from "./cards.js";

const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const popupProfileAddButton = document.querySelector('.profile__add-button');
const popupProfileImageEdit = document.querySelector('.profile__image-edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCards = document.querySelector('.popup_type_add-cards');
const popupEditImageProfile = document.querySelector('.popup_type_edit-profile-image');
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
function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

popupProfileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  enableValidation();
});
popupProfileAddButton.addEventListener('click', () => {
  openPopup(popupAddCards);
  enableValidation();
});
popupProfileImageEdit.addEventListener('click', () => {
  openPopup(popupEditImageProfile);
  enableValidation();
})
popupCloseButton.forEach(item => {
  item.addEventListener('click', () => {
    const popupClose = item.closest('.popup');
    closePopup(popupClose);
  });
});

popup.forEach(item => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(item);
    }
  })
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(item);
    }
  })
})

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  closePopup(popupEditProfile);
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
    openPopup(popupImage);
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
  document.forms.addCard.reset();
  closePopup(popupAddCards);
}
formElementAddCards.addEventListener('submit', addCard);

// Валидация форм
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__text-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
  errorElement.classList.remove('popup__text-error_active');
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__save-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}
