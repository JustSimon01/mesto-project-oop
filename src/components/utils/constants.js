export const popupImage = ".popup_type_image";
export const popupAddCards = ".popup_type_add-cards";
export const popupEditImageProfile = ".popup_type_edit-profile-image";
export const popupEditProfile = ".popup_type_edit-profile";

export const container = document.querySelector(".gallery");
export const imageProfile = document.querySelector(".profile__image");
export const imageEditInput = document.querySelector(".popup__edit-image");
export const profileName = document.querySelector(".profile__name");
export const profileOccupation = document.querySelector(".profile__occupation");
export const nameInput = document.querySelector(".popup__name");
export const jobInput = document.querySelector(".popup__job");
export const popupCloseButtons = document.querySelectorAll(".popup__close-button");
export const popupProfileEditButton = document.querySelector(".profile__edit-button");
export const popupProfileAddButton = document.querySelector(".profile__add-button");
export const popupProfileImageEditButton = document.querySelector(
  ".profile__image-edit"
);
export const formElementEditProfile = document.querySelector(popupEditProfile).querySelector(".popup__form");
export const formElementAddCards = document.querySelector(popupAddCards).querySelector(".popup__form");
export const formElementEditImageProfile = document.querySelector(popupEditImageProfile).querySelector(".popup__form");

export const popupSelectorClass = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__text-error_active",
};

export const userInfoSelectors = {
  userName: ".profile__name",
  userJob: ".profile__occupation",
  userAvatar: ".profile__image",
};
export const popupCardImage = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");
