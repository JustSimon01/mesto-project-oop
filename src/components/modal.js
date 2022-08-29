import {
  createCard,
  renderCard
} from "./cards.js";
import {
  closePopup
} from "./utils.js";

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

function addCard(evt) {
  evt.preventDefault();

  renderCard(container, createCard(urlInput.value, placeInput.value));
  document.forms.addCard.reset();
  closePopup(popupAddCards);
}

function editProfileImage(evt) {
  evt.preventDefault();
  imageProfile.src = imageEditInput.value;
  closePopup(popupEditImageProfile);
}

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

export {
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
};
