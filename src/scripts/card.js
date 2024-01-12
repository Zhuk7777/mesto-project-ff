//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

/**
 * Функция создания карточки
 * @function
 * @param {object} cardData - данные картинки: ссылка на нее, ее описание
 * @param {function} deleteCard - функция удаления карточки
 * @param {function} likeCard - функция лайка карточки
 * @param {function} openCardImage - функция открытия изображения
 * @returns готовый к вставке на страницу объект карточки
 */
const createCard  = (cardData, deleteCard, likeCard, openCardImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage =  cardElement.querySelector('.card__image');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
  likeButton.addEventListener('click', () => likeCard(likeButton));
  cardImage.addEventListener('click', () => openCardImage(cardData));

  return cardElement;
}

/**
 * Функция удаления карточки
 * @function
 * @param {object} card - карточка, которую надо удалить
 */
const deleteCard = card => {card.remove()}

/**
 * функция лайка карточки
 * @function
 * @param {object} likeButton - кликнутая кнопка лайка
 */
const likeCard = likeButton => {likeButton.classList.toggle('card__like-button_is-active')}

export {createCard, deleteCard, likeCard};