// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard  = (cardImage, cardTitle, deleteCard, likeCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);

  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = evt => {evt.target.closest('.card').remove()}

// @todo: функция лайка карточки
const likeCard = evt => {evt.target.classList.toggle('card__like-button_is-active')}

// @todo: Вывести карточки на страницу
cardContainer.append(...initialCards.map(card => createCard(card.link, card.name, deleteCard, likeCard)));
