// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard  = (cardData, deleteCard, likeCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
  likeButton.addEventListener('click', () => likeCard(likeButton));

  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = card => {card.remove()}

// @todo: функция лайка карточки
const likeCard = likeButton => {likeButton.classList.toggle('card__like-button_is-active')}

// @todo: Вывести карточки на страницу
cardsContainer.append(...initialCards.map(card => createCard(card, deleteCard, likeCard)));
