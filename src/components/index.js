import FormValidator from "./FormValidator.js";
import Api from "./api.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
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
  userInfoSelectors,
} from "./constants.js";
import "../pages/index.css";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
  headers: {
    authorization: "21ec355f-df00-4771-88de-f3c59b8377f4",
    "Content-Type": "application/json",
  },
});
let userId;

//открытие попапа редактирования профиля
popupProfileEditButton.addEventListener("click", () => {
  submitUser.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
  submitUser.activeButton(
    popupSelectorClass.submitButtonSelector,
    popupSelectorClass.inactiveButtonClass
  );
});
//открытие попапа добавления карточек
popupProfileAddButton.addEventListener("click", () => {
  submitButton.open();
});

//открытие попапа смены аватара
popupProfileImageEditButton.addEventListener("click", () => {
  imageEditInput.value = "";
  submitAvatar.open();
});

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
    submitButton.loading(true);
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
                  openImage.open(popupImage);
                  openImage.setEventListeners();
                },
                handlePutLikeCard: (evt, cardId, element) => {
                  api
                    .putLikeCard(cardId)
                    .then((res) => {
                      element.querySelector(".card__like-count").textContent =
                        res.likes.length;
                      evt.target.classList.add("card__like-button_active");
                    })
                    .catch((err) => console.log(err));
                },
                handleDeleteLikeCard: (evt, cardId, element) => {
                  api
                    .deleteLikeCard(cardId)
                    .then((res) => {
                      element.querySelector(".card__like-count").textContent =
                        res.likes.length;
                      evt.target.classList.remove("card__like-button_active");
                    })
                    .catch((err) => console.log(err));
                },
                handleDeleteCard: (cardId, cardItem) => {
                  api
                    .deleteCard(cardId)
                    .then(() => {
                      cardItem.closest(".card").remove();
                    })
                    .catch((err) => console.log(err));
                },
              });
              const cardElement = card.generate();
              cardInitial.addItem(cardElement);
            },
          },
          container
        );
        cardInitial.renderer();
        submitButton.inactiveButton(
          popupSelectorClass.submitButtonSelector,
          popupSelectorClass.inactiveButtonClass
        );
        submitButton.close();
      })
      .catch((err) => console.log(err))
      .finally(() => submitButton.loading(false));
  },
});
submitButton.setEventListeners();

//имя и работа в профиле
const setUser = new UserInfo(userInfoSelectors);
const submitUser = new PopupWithForm(popupEditProfile, {
  submitFormCallBack: (formData) => {
    submitUser.loading(true);
    api
      .patchProfile(formData.name, formData.occupation)
      .then(() => {
        setUser.setUserInfo(formData.name, formData.occupation);
        submitUser.close();
      })
      .catch((err) => console.log(err))
      .finally(() => submitUser.loading(false));
  },
});

submitUser.setEventListeners();

//смена аватара
const submitAvatar = new PopupWithForm(popupEditImageProfile, {
  submitFormCallBack: (formData) => {
    submitAvatar.loading(true);
    api
      .patchAvatar(formData.url)
      .then(() => {
        const setUser = new UserInfo(userInfoSelectors);
        setUser.setUserAvatar(formData.url);
        //неактивная кнопка из старого функционала, надо подумать куда переместить
        submitAvatar.inactiveButton(
          popupSelectorClass.submitButtonSelector,
          popupSelectorClass.inactiveButtonClass
        );
        submitAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => submitAvatar.loading(false));
  },
});
submitAvatar.setEventListeners();

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
              api
                .putLikeCard(cardId)
                .then((res) => {
                  element.querySelector(".card__like-count").textContent =
                    res.likes.length;
                  evt.target.classList.add("card__like-button_active");
                })
                .catch((err) => console.log(err));
            },
            handleDeleteLikeCard: (evt, cardId, element) => {
              api
                .deleteLikeCard(cardId)
                .then((res) => {
                  element.querySelector(".card__like-count").textContent =
                    res.likes.length;
                  evt.target.classList.remove("card__like-button_active");
                })
                .catch((err) => console.log(err));
            },
            handleDeleteCard: (cardId, cardItem) => {
              api
                .deleteCard(cardId)
                .then(() => {
                  cardItem.closest(".card").remove();
                })
                .catch((err) => console.log(err));
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
