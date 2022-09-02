import {
  initialCards,
  createCard,
  renderCard
} from "./cards.js";
import {
  enableValidation,
  inactiveButton,
  activeButton
} from "./validate.js";
import {
  openPopup,
  closePopup
} from "./modal.js";
import {
  getInitialCards,
  getInfoUsers,
  deleteCard,
  deleteLikeCard
} from "./api.js";
import '../pages/index.css';

const placeInput = document.querySelector('.popup__place');
const urlInput = document.querySelector('.popup__url');
const popupAddCards = document.querySelector('.popup_type_add-cards');
const container = document.querySelector('.gallery');
const imageProfile = document.querySelector('.profile__image');
const imageEditInput = document.querySelector('.popup__edit-image');
const popupEditImageProfile = document.querySelector('.popup_type_edit-profile-image');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
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
  activeButton(popupEditProfile.querySelector(popupSelectorClass.submitButtonSelector), popupSelectorClass);
});
popupProfileAddButton.addEventListener('click', () => {
  openPopup(popupAddCards);
});
popupProfileImageEditButton.addEventListener('click', () => {
  imageEditInput.value = '';
  openPopup(popupEditImageProfile);
})
popupCloseButton.forEach(item => {
  item.addEventListener('click', () => {
    const popupClose = item.closest('.popup');
    closePopup(popupClose);
  });
});

enableValidation(popupSelectorClass);

function addCard(evt) {
  evt.preventDefault();

  renderCard(container, createCard(urlInput.value, placeInput.value));
  document.forms.addCard.reset();
  closePopup(popupAddCards);
  inactiveButton(popupAddCards.querySelector(popupSelectorClass.submitButtonSelector), popupSelectorClass);
}
formElementAddCards.addEventListener('submit', addCard);

function editProfileImage(evt) {
  evt.preventDefault();
  imageProfile.src = imageEditInput.value;
  closePopup(popupEditImageProfile);

  inactiveButton(popupEditImageProfile.querySelector(popupSelectorClass.submitButtonSelector), popupSelectorClass);
}
formElementEditImageProfile.addEventListener('submit', editProfileImage);

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  closePopup(popupEditProfile);
}
formElementEditProfile.addEventListener('submit', submitProfileForm);

getInitialCards()
  .then(cards => {
    cards.reverse().forEach(card => {
      renderCard(container, createCard(card.link, card.name, card._id, card.likes.length));
      if (card.owner._id === "8526b46f4ab7627011941e9a") {
        document.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
      }
    })
  })
  .catch(err => {
    console.log(err);
  })

getInfoUsers()
  .then(data => {
    profileName.textContent = data.name;
    profileOccupation.textContent = data.about;
    imageProfile.src = data.avatar;
  })
