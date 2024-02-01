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
const createCard  = (cardData, currentUserId, deleteCard, likeCard, openCardImage) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const title = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCount = cardElement.querySelector('.card__likes-count');
  const image =  cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;
  likesCount.textContent = cardData.likes.length;

  if(currentUserId === cardData.owner._id){
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    deleteButton.classList.add('card__delete-button_visible');
  }
  likeButton.addEventListener('click', () => likeCard(likeButton));
  image.addEventListener('click', () => openCardImage(cardData));

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