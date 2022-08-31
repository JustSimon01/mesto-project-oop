// Открытие и закрытие модального окна
function openPopup(item) {
  item.classList.add('popup_opened');

  document.addEventListener('keydown', closeEscButton);
  document.addEventListener('click', closeOverlayClick);
}

function closePopup(item) {
  item.classList.remove('popup_opened');

  document.removeEventListener('keydown', closeEscButton);
  item.removeEventListener('click', closeOverlayClick);
}

function closeEscButton(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');

    closePopup(popupActive);
  }
}

function closeOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

export {
  openPopup,
  closePopup
}
