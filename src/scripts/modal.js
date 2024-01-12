/**
 * Функция открытия модального окна
 * @function
 * @param {object} popup - модальное окно, которое надо открыть
 */
export const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', pressEscape);
}

/**
 * Функция закрытия модального окна
 * @function
 * @param {object} popup - модальное окно, которое надо закрыть
 */
export const closeModal = (popup) => {
  document.removeEventListener('keydown', pressEscape);
  popup.classList.remove('popup_is-opened');
}

/**
 * Обработчик события клика мышкой при открытом модальном окне
 * @function
 * @param {object} evt - событие клика мышкой
 */
export const clickPopup = (evt) => {
  if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close'))
    closeModal(document.querySelector('.popup_is-opened'));
}

/**
 * Обработчик события нажатия клавиши Escape при открытом модальном окне
 * @function
 * @param {object} evt событие нажатия клавиши Escape
 */
const pressEscape = (evt) => {
  if(evt.key === 'Escape')
    closeModal(document.querySelector('.popup_is-opened'));
}