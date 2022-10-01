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
  submitUser.open();
  const { name, about } = setUser.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  userInfo.setInactiveButton();
});
//открытие попапа добавления карточек
popupProfileAddButton.addEventListener("click", () => {
  submitButton.open();
  addCard.setInactiveButton();
});

//открытие попапа смены аватара
popupProfileImageEditButton.addEventListener("click", () => {
  submitAvatar.open();
  avatarChange.setInactiveButton();
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

const submitButton = new PopupWithForm(popupAddCards, {
  submitFormCallBack: (formData) => {
    submitButton.renderLoading(true);
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
        submitButton.close();
      })
      .catch((err) => console.log(err))
      .finally(() => submitButton.renderLoading(false));
  },
});
submitButton.setEventListeners();

//имя и работа в профиле
const submitUser = new PopupWithForm(popupEditProfile, {
  submitFormCallBack: (formData) => {
    submitUser.renderLoading(true);
    api
      .patchProfile(formData.name, formData.occupation)
      .then((res) => {
        setUser.setUserInfo(res);
        submitUser.close();
      })
      .catch((err) => console.log(err))
      .finally(() => submitUser.renderLoading(false));
  },
});

submitUser.setEventListeners();

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
