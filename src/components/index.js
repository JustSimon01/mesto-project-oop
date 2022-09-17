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
import Api from "./Api.js";
import Card from "./Card.js";
import Section from "./Section.js";
import '../pages/index.css';

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '21ec355f-df00-4771-88de-f3c59b8377f4',
    'Content-Type': 'application/json'
  }
});
let userId;
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
  api.postAddCard(placeInput.value, urlInput.value)
    .then(card => {
      renderCard(container, createCard(card.link, card.name, card._id, card.likes.length, card.likes));
      document.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
      closePopup(popupAddCards);
      inactiveButton(popupAddCards.querySelector(popupSelectorClass.submitButtonSelector), popupSelectorClass);
      document.forms.addCard.reset();
    })
    .catch(err => console.log(err))
    .finally(() => loading(false))
});

formElementEditImageProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  loading(true);
  api.patchAvatar(imageEditInput.value)
    .then(res => {
      imageProfile.src = res.avatar;
      closePopup(popupEditImageProfile);
      inactiveButton(popupEditImageProfile.querySelector(popupSelectorClass.submitButtonSelector), popupSelectorClass);
    })
    .catch(err => console.log(err))
    .finally(() => loading(false))
});

formElementEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  loading(true);
  api.patchProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileOccupation.textContent = res.about;
      closePopup(popupEditProfile);
    })
    .catch(err => console.log(err))
    .finally(() => loading(false));
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

// Promise.all([getInitialCards(), getInfoUsers()])
//   .then(([cards, data]) => {
// userId = data._id;

// cards.reverse().forEach(card => {
//   renderCard(container, createCard(card.link, card.name, card._id, card.likes.length, card.likes));
//   if (card.owner._id === userId) {
//     document.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
//   }

//   card.likes.forEach(like => {
//     if (like._id === userId) {
//       document.querySelector('.card__like-button').classList.add('card__like-button_active');
//     } else {
//       document.querySelector('.card__like-button').classList.remove('card__like-button_active');
//     }
//   })
// })

// profileName.textContent = data.name;
// profileOccupation.textContent = data.about;
// imageProfile.src = data.avatar;
//   })
//   .catch(err => console.log(err));

Promise.all([api.getInitialCards(), api.getInfoUsers()])
  .then(([cards, data]) => {
    userId = data._id;
    const cardsInitial = new Section({
      items: cards,
      renderer: (item) => {
        const card = new Card(item, "#card-template", userId);
        const cardElement = card.generate();
        cardsInitial.setItem(cardElement);
      }
    }, container);
    cardsInitial.renderItems();
    /*
    cards.reverse().forEach(card => {
      renderCard(container, createCard(card.link, card.name, card._id, card.likes.length, card.likes));
      if (card.owner._id === userId) {
        document.querySelector('.card__delete-button').classList.add('card__delete-button_visible');
      }

      card.likes.forEach(like => {
        if (like._id === userId) {
          document.querySelector('.card__like-button').classList.add('card__like-button_active');
        } else {
          document.querySelector('.card__like-button').classList.remove('card__like-button_active');
        }
      })
    })
*/
    profileName.textContent = data.name;
    profileOccupation.textContent = data.about;
    imageProfile.src = data.avatar;
  })
  .catch(err => console.log(err));
