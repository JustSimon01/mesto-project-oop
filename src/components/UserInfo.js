import { nameInput, jobInput } from "./utils/constants.js";

export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userName = userName;
    this._userJob = userJob;
    this._userAvatar = userAvatar;
  }

  getUserInfo(api) {
    api.getInfoUsers().then((res) => {
      return (userId = res);
    });
  }

  setUserInfo(data) {
    const profileName = document.querySelector(this._userName);
    const profileOccupation = document.querySelector(this._userJob);
    profileName.textContent = data.name;
    profileOccupation.textContent = data.about;
    let userId = data._id;
  }

  setUserAvatar(avatar) {
    const imageProfile = document.querySelector(this._userAvatar);
    imageProfile.src = avatar;
  }
}
