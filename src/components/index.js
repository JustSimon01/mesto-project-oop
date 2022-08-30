import {
  initialCards,
  createCard,
  renderCard
} from "./cards.js";
import {
  enableValidation
} from "./validate.js";
import {
  openPopup,
  closePopup
} from "./utils.js";
import {
  submitProfileForm,
  editProfileImage,
  addCard,
  popupAddCards,
  popupEditImageProfile,
  container,
  imageEditInput,
  profileName,
  profileOccupation,
  nameInput,
  jobInput,
  popupEditProfile
} from "./modal.js";
import '../pages/index.css';

const popupCloseButton = document.querySelectorAll('.popup__close-button');
const popupProfileEditButton = document.querySelector('.profile__edit-button');
const popupProfileAddButton = document.querySelector('.profile__add-button');
const popupProfileImageEditButton = document.querySelector('.profile__image-edit');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');
const formElementAddCards = popupAddCards.querySelector('.popup__form');
const formElementEditImageProfile = popupEditImageProfile.querySelector('.popup__form');
const popupSelectorClass = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active'
}

popupProfileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  enableValidation(popupSelectorClass);
});
popupProfileAddButton.addEventListener('click', () => {
  openPopup(popupAddCards);
  enableValidation(popupSelectorClass);
});
popupProfileImageEditButton.addEventListener('click', () => {
  imageEditInput.value = '';
  openPopup(popupEditImageProfile);
  enableValidation(popupSelectorClass);
})
popupCloseButton.forEach(item => {
  item.addEventListener('click', () => {
    const popupClose = item.closest('.popup');
    closePopup(popupClose);
  });
});

formElementEditProfile.addEventListener('submit', submitProfileForm);
formElementEditImageProfile.addEventListener('submit', editProfileImage);
formElementAddCards.addEventListener('submit', addCard);

initialCards.forEach(item => {
  renderCard(container, createCard(item.link, item.name))
});
