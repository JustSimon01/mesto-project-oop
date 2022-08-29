// Валидация форм
function showInputError(formElement, inputElement, errorMessage, selectorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorClass.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorClass.errorClass);
}

function hideInputError(formElement, inputElement, selectorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorClass.inputErrorClass);
  errorElement.classList.remove(selectorClass.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, selectorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectorClass);
  } else {
    hideInputError(formElement, inputElement, selectorClass);
  }
};

function setEventListeners(formElement, selectorClass) {
  const inputList = Array.from(formElement.querySelectorAll(selectorClass.inputSelector));
  const buttonElement = formElement.querySelector(selectorClass.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, selectorClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectorClass);

      toggleButtonState(inputList, buttonElement, selectorClass);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, selectorClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectorClass.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(selectorClass.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

export function enableValidation(selectorClass) {
  const formList = Array.from(document.querySelectorAll(selectorClass.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, selectorClass);
  });
};
