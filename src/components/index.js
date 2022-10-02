import FormValidator from "./FormValidator.js";
import Api from "./Api.js";
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
} from "./utils/constants.js";
import "../pages/index.css";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14",
  headers: {
    authorization: "21ec355f-df00-4771-88de-f3c59b8377f4",
    "Content-Type": "application/json",
  },
});
let userId = "";
//первичная подгрузка данных
const setUser = new UserInfo(userInfoSelectors);
//открытие попапа редактирования профиля
popupProfileEditButton.addEventListener("click", () => {
  profilePopup.open();
  const { name, about } = setUser.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  profileFormValidator.resetValidation();
});
//открытие попапа добавления карточек
popupProfileAddButton.addEventListener("click", () => {
  cardPopup.open();
  addCardFormValidator.resetValidation();
});

//открытие попапа смены аватара
popupProfileImageEditButton.addEventListener("click", () => {
  submitAvatar.open();
  avatarFromValidator.resetValidation();
});

//новая валидация полей
const profileFormValidator = new FormValidator(
  popupSelectorClass,
  formElementEditProfile
);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  popupSelectorClass,
  formElementAddCards
);
addCardFormValidator.enableValidation();

const avatarFromValidator = new FormValidator(
  popupSelectorClass,
  formElementEditImageProfile
);
avatarFromValidator.enableValidation();

//добавление карточки
const openImage = new PopupWithImage(popupImage);
openImage.setEventListeners();

function handlePutLike(card) {
  api
    .putLikeCard(card.getId())
    .then((res) => {
      card.updatePutLike(res);
    })
    .catch((err) => console.log(err));
}

function handleDeleteLike(card) {
  api
    .deleteLikeCard(card.getId())
    .then((res) => {
      card.updateDeleteLike(res);
    })
    .catch((err) => console.log(err));
}

function handleDeleteCard(card) {
  api
    .deleteCard(card.getId())
    .then(() => {
      card.deleteCard();
    })
    .catch((err) => console.log(err));
}

function createCard(item) {
  const cardElement = new Card(item, "#card-template", userId, {
    handleCardClick: () => {
      openImage.open(item);
    },
    handlePutLikeCard: handlePutLike,
    handleDeleteLikeCard: handleDeleteLike,
    handleDeleteCard: handleDeleteCard,
  });

  return cardElement;
}

const cardPopup = new PopupWithForm(popupAddCards, {
  submitFormCallBack: (formData) => {
    cardPopup.renderLoading(true);
    api
      .postAddCard(formData.place, formData.url)
      .then((cards) => {
        const cardInitial = new Section(
          {
            items: cards,
            renderer: (item) => {
              const cardElement = createCard(item).generate();
              cardInitial.addItem(cardElement);
            },
          },
          container
        );
        cardInitial.renderer();
        cardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => cardPopup.renderLoading(false));
  },
});
cardPopup.setEventListeners();

//имя и работа в профиле
const profilePopup = new PopupWithForm(popupEditProfile, {
  submitFormCallBack: (formData) => {
    profilePopup.renderLoading(true);
    api
      .patchProfile(formData.name, formData.occupation)
      .then((res) => {
        setUser.setUserInfo(res);
        profilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => profilePopup.renderLoading(false));
  },
});

profilePopup.setEventListeners();

//смена аватара
const submitAvatar = new PopupWithForm(popupEditImageProfile, {
  submitFormCallBack: (formData) => {
    submitAvatar.renderLoading(true);
    api
      .patchAvatar(formData.url)
      .then((res) => {
        setUser.setUserInfo(res);
        submitAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => submitAvatar.renderLoading(false));
  },
});
submitAvatar.setEventListeners();

//первичная подгрузка карточек
Promise.all([api.getInfoUsers(), api.getInitialCards()])
  .then(([data, cards]) => {
    setUser.setUserInfo(data);
    userId = data._id;
    const cardsInitial = new Section(
      {
        items: cards,
        renderer: (item) => {
          const cardElement = createCard(item).generate();
          cardsInitial.setItem(cardElement);
        },
      },
      container
    );
    cardsInitial.renderItems(cards);
  })
  .catch((err) => console.log(err));
