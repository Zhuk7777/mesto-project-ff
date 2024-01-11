// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
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

// @todo: Функция удаления карточки
const deleteCard = card => {card.remove()}

// @todo: функция лайка карточки
const likeCard = likeButton => {likeButton.classList.toggle('card__like-button_is-active')}

export {createCard, deleteCard, likeCard};