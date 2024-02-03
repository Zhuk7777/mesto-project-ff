export const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', pressEscape);
}

export const closeModal = (popup) => {
  document.removeEventListener('keydown', pressEscape);
  popup.classList.remove('popup_is-opened');
}

export const clickPopup = (evt) => {
  if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close'))
    closeModal(document.querySelector('.popup_is-opened'));
}

const pressEscape = (evt) => {
  if(evt.key === 'Escape')
    closeModal(document.querySelector('.popup_is-opened'));
}