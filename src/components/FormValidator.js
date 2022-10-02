export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._settings.formSelector = settings.formSelector;
    this._settings.inputSelector = settings.inputSelector;
    this._settings.submitButtonSelector = settings.submitButtonSelector;
    this._settings.inactiveButtonClass = settings.inactiveButtonClass;
    this._settings.inputErrorClass = settings.inputErrorClass;
    this._settings.errorClass = settings.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  setInactiveButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  setActiveButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  resetValidation() {
    //this._toggleButtonState(); //прогонка валидации после открытия попапа, статус кнопки меняется в зависимости от данных полей форм
    this.setInactiveButton(); //кнопка всегда неактивна при открытии попапа
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // очистка полей ошибок формы
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.setInactiveButton();
    } else {
      this.setActiveButton();
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}
