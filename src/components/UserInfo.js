import Api from "./Api.js";
import { openPopup, closePopup } from "./modal.js";
import { loading } from "./index.js";

export default class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo(api) {
    api.getInfoUsers();
  }

  setUserInfo(api, name, about) {
    api
      .patchProfile(name, about)
      .then((res) => {
        const profileName = document.querySelector(this._userName);
        const profileOccupation = document.querySelector(this._userJob);
        profileName.textContent = res.name;
        profileOccupation.textContent = res.about;
        const popupEditProfile = document.querySelector(
          ".popup_type_edit-profile"
        );
        closePopup(popupEditProfile);
      })
      .catch((err) => console.log(err))
      .finally(() => loading(false));
  }
}
