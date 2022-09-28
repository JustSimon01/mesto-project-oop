import {
  nameInput,
  jobInput
} from './constants.js';

export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userName = userName;
    this._userJob = userJob;
    this._userAvatar = userAvatar;
  }

  getUserInfo(api) {
    api.getInfoUsers();
  }

  setUserInfo(name, about) {
    const profileName = document.querySelector(this._userName);
    const profileOccupation = document.querySelector(this._userJob);
    profileName.textContent = name;
    profileOccupation.textContent = about;
  }

  setUserAvatar(avatar) {
    const imageProfile = document.querySelector(this._userAvatar);
    imageProfile.src = avatar;
  }
}
