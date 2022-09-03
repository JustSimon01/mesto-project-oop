import {
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
  patchProfile,
  patchAddCard,
  patchAvatar
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

formElementAddCards.addEventListener('submit', (evt) => {
  evt.preventDefault();
  loading(true);
  patchAddCard(placeInput.value, urlInput.value)
    .then(card => {
      renderCard(container, createCard(card.link, card.name, card._id, card.likes.length, card.likes));
      document.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
      closePopup(popupAddCards);
      inactiveButton(popupAddCards.querySelector(popupSelectorClass.submitButtonSelector), popupSelectorClass);
      document.forms.addCard.reset();
    }).catch(err => console.log(err))
    .finally(() => loading(false))
});

formElementEditImageProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  imageProfile.src = imageEditInput.value;
  closePopup(popupEditImageProfile);
  loading(true);
  patchAvatar(imageEditInput.value)
    .catch(err => console.log(err))
    .finally(() => loading(false))
  inactiveButton(popupEditImageProfile.querySelector(popupSelectorClass.submitButtonSelector), popupSelectorClass);
});

formElementEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  loading(true);
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  patchProfile(nameInput.value, jobInput.value)
    .catch(err => console.log(err))
    .finally(() => loading(false));

  closePopup(popupEditProfile);
});

function loading(isLoading) {
  if (isLoading) {
    document.querySelectorAll('.popup__save-button').forEach(save => {
      save.value = 'Сохранить...';
    })
  } else {
    document.querySelectorAll('.popup__save-button').forEach(save => {
      save.value = 'Сохранить';
    })
  }
}

getInitialCards()
  .then(cards => {
    cards.reverse().forEach(card => {
      renderCard(container, createCard(card.link, card.name, card._id, card.likes.length, card.likes));
      if (card.owner._id === "8526b46f4ab7627011941e9a") {
        document.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
      }

      card.likes.forEach(like => {
        if (like._id === "8526b46f4ab7627011941e9a") {
          document.querySelector('.card__like-button').classList.add('card__like-button_active');
        } else {
          document.querySelector('.card__like-button').classList.remove('card__like-button_active');
        }
      })
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
  }).catch(err => {
    console.log(err);
  })
