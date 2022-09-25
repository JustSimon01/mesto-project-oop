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
import "../pages/index.css";

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
  headers: {
    authorization: "21ec355f-df00-4771-88de-f3c59b8377f4",
    "Content-Type": "application/json",
  },
});
let userId;
const placeInput = document.querySelector(".popup__place");
const popupImage = document.querySelector(".popup_type_image");
const urlInput = document.querySelector(".popup__url");
const popupAddCards = document.querySelector(".popup_type_add-cards");
const container = document.querySelector(".gallery");
const imageProfile = document.querySelector(".profile__image");
const imageEditInput = document.querySelector(".popup__edit-image");
const popupEditImageProfile = document.querySelector(
  ".popup_type_edit-profile-image"
);
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__job");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupCloseButton = document.querySelectorAll(".popup__close-button");
const popupProfileEditButton = document.querySelector(".profile__edit-button");
const popupProfileAddButton = document.querySelector(".profile__add-button");
const popupProfileImageEditButton = document.querySelector(
  ".profile__image-edit"
);
const formElementEditProfile = popupEditProfile.querySelector(".popup__form");
const formElementAddCards = popupAddCards.querySelector(".popup__form");
const formElementEditImageProfile =
  popupEditImageProfile.querySelector(".popup__form");

const popupSelectorClass = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__text-error_active",
};

const userInfoSelectors = {
  userName: ".profile__name",
  userJob: ".profile__occupation",
};

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
popupProfileAddButton.addEventListener("click", () => {
  openPopup(popupAddCards);
});
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

const submitButton = new PopupWithForm(popupAddCards, {
  submitFormCallBack: () => {
    api.postAddCard(placeInput.value, urlInput.value).then((cards) => {
      console.log(cards);
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
            });
            const cardElement = card.generate();
            cardInitial.addItem(cardElement);
          },
        },
        container
      );
      cardInitial.renderer();
    });
  },
});

submitButton.setEventListeners();

formElementEditImageProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  loading(true);
  api
    .patchAvatar(imageEditInput.value)
    .then((res) => {
      imageProfile.src = res.avatar;
      closePopup(popupEditImageProfile);
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
});

formElementEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  loading(true);
  const setUser = new UserInfo(userInfoSelectors);
  setUser.setUserInfo(api, nameInput.value, jobInput.value);
});

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
