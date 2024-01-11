// @todo: Функция открытия модального окна
export const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  setTimeout(() =>{popup.classList.add('popup_is-opened')}, 0);
  popup.addEventListener('click', clickPopup);
  document.addEventListener('keydown', pressEscape);
}

// @todo: Функция закрытия модального окна
export const closeModal = (popup) => {
  popup.removeEventListener('click', clickPopup);
  document.removeEventListener('keydown', pressEscape);
  popup.classList.remove('popup_is-opened');
}

// @todo: Обработчик события клика мышкой на модальное окно
const clickPopup = (evt) => {
  if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close'))
    closeModal(document.querySelector('.popup_is-opened'));
}

// @todo: Обработчик события нажатия клавиши Escape при открытом модальном окне
const pressEscape = (evt) => {
  if(evt.key === 'Escape')
    closeModal(document.querySelector('.popup_is-opened'));
}