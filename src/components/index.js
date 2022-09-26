import { createCard, renderCard } from "./cards.js";
import { inactiveButton, activeButton } from "./validate.js"; //enableValidation убрана, inactiveButton, activeButton пока в старом файле
import { openPopup, closePopup } from "./modal.js";
import FormValidator from "./FormValidator.js";
import Api from "./api.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import {
  popupImage,
  popupAddCards,
  container,
  imageProfile,
  imageEditInput,
  popupEditImageProfile,
  profileName,
  profileOccupation,
  nameInput,
  jobInput,
  popupEditProfile,
  popupProfileEditButton,
  popupProfileAddButton,
  popupProfileImageEditButton,
  formElementEditProfile,
  formElementAddCards,
  formElementEditImageProfile,
  popupSelectorClass,
  userInfoSelectors
} from './constants.js';
import "../pages/index.css";

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
  headers: {
    authorization: "21ec355f-df00-4771-88de-f3c59b8377f4",
    "Content-Type": "application/json",
  },
});
let userId;

//открытие попапа редактирования профиля
popupProfileEditButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  //активная кнопка из старого функционала, надо подумать куда переместить
  activeButton(
    popupEditProfile.querySelector(popupSelectorClass.submitButtonSelector),
    popupSelectorClass
  );
});
//открытие попапа добавления карточек
popupProfileAddButton.addEventListener("click", () => {
  openPopup(popupAddCards);
});

//открытие попапа смены аватара
popupProfileImageEditButton.addEventListener("click", () => {
  imageEditInput.value = "";
  openPopup(popupEditImageProfile);
});

// Временная кнопка закрытия попапов.
const popupClose = new Popup(document.querySelector(".popup"));
popupClose.setEventListeners();

//новая валидация полей
const userInfo = new FormValidator(popupSelectorClass, formElementEditProfile);
userInfo.enableValidation();

const addCard = new FormValidator(popupSelectorClass, formElementAddCards);
addCard.enableValidation();

const avatarChange = new FormValidator(
  popupSelectorClass,
  formElementEditImageProfile
);
avatarChange.enableValidation();

//добавление карточки
const submitButton = new PopupWithForm(popupAddCards, {
  submitFormCallBack: (formData) => {
    loading(true);
    api
      .postAddCard(formData.place, formData.url)
      .then((cards) => {
        const cardInitial = new Section(
          {
            items: cards,
            renderer: (item) => {
              const card = new Card(item, "#card-template", userId, {
                handleCardClick: () => {
                  const openImage = new PopupWithImage(item, popupImage);
                  openImage.open();
                  openImage.setEventListeners();
                },
                handlePutLikeCard: (evt, cardId, element) => {
                  api.putLikeCard(cardId)
                    .then(res => {
                      element.querySelector('.card__like-count').textContent = res.likes.length;
                      evt.target.classList.add('card__like-button_active');
                    })
                    .catch(err => console.log(err));
                },
                handleDeleteLikeCard: (evt, cardId, element) => {
                  api.deleteLikeCard(cardId)
                    .then(res => {
                      element.querySelector('.card__like-count').textContent = res.likes.length;
                      evt.target.classList.remove('card__like-button_active');
                    })
                    .catch(err => console.log(err));
                },
                handleDeleteCard: (cardId, cardItem) => {
                  api.deleteCard(cardId)
                    .then(() => {
                      cardItem.closest('.card').remove();
                    })
                    .catch(err => console.log(err));
                }
              });
              const cardElement = card.generate();
              cardInitial.addItem(cardElement);
            },
          },
          container
        );
        cardInitial.renderer();
        inactiveButton(
          popupAddCards.querySelector(popupSelectorClass.submitButtonSelector),
          popupSelectorClass
        );
      })
      .catch((err) => console.log(err))
      .finally(() => loading(false));
  },
});
submitButton.setEventListeners();

//имя и работа в профиле
const submitUser = new PopupWithForm(popupEditProfile, {
  submitFormCallBack: (formData) => {
    api
      .patchProfile(formData.name, formData.occupation)
      .then(() => {
        const setUser = new UserInfo(userInfoSelectors);
        setUser.setUserInfo(formData.name, formData.occupation);
      })
      .catch((err) => console.log(err))
      .finally(() => loading(false));
  },
});
submitUser.setEventListeners();

//смена аватара
const submitAvatar = new PopupWithForm(popupEditImageProfile, {
  submitFormCallBack: (formData) => {
    loading(true);
    api
      .patchAvatar(formData.url)
      .then(() => {
        const setUser = new UserInfo(userInfoSelectors);
        setUser.setUserAvatar(formData.url);
        //неактивная кнопка из старого функционала, надо подумать куда переместить
        inactiveButton(
          popupEditImageProfile.querySelector(
            popupSelectorClass.submitButtonSelector
          ),
          popupSelectorClass
        );
      })
      .catch((err) => console.log(err))
      .finally(() => loading(false));
  },
});
submitAvatar.setEventListeners();

//смена кнопки загрузки
export function loading(isLoading) {
  if (isLoading) {
    document.querySelectorAll(".popup__save-button").forEach((save) => {
      save.value = "Сохранить...";
    });
  } else {
    document.querySelectorAll(".popup__save-button").forEach((save) => {
      save.value = "Сохранить";
    });
  }
}

//первичная подгрузка карточек
Promise.all([api.getInitialCards(), api.getInfoUsers()])
  .then(([cards, data]) => {
    userId = data._id;
    const cardsInitial = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(item, "#card-template", userId, {
            handleCardClick: () => {
              const openImage = new PopupWithImage(item, popupImage);
              openImage.open();
              openImage.setEventListeners();
            },
            handlePutLikeCard: (evt, cardId, element) => {
              api.putLikeCard(cardId)
                .then(res => {
                  element.querySelector('.card__like-count').textContent = res.likes.length;
                  evt.target.classList.add('card__like-button_active');
                })
                .catch(err => console.log(err));
            },
            handleDeleteLikeCard: (evt, cardId, element) => {
              api.deleteLikeCard(cardId)
                .then(res => {
                  element.querySelector('.card__like-count').textContent = res.likes.length;
                  evt.target.classList.remove('card__like-button_active');
                })
                .catch(err => console.log(err));
            },
            handleDeleteCard: (cardId, cardItem) => {
              api.deleteCard(cardId)
                .then(() => {
                  cardItem.closest('.card').remove();
                })
                .catch(err => console.log(err));
            }
          });
          const cardElement = card.generate();
          cardsInitial.setItem(cardElement);
        },
      },
      container
    );
    cardsInitial.renderItems();

    profileName.textContent = data.name;
    profileOccupation.textContent = data.about;
    imageProfile.src = data.avatar;
  })
  .catch((err) => console.log(err));
