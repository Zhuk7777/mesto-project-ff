import { putLike, deleteLike } from "./api";
import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const deletePopup = document.querySelector('.popup_type_delete-card');

const cardToDeleted = {
  cardElement: null,
  cardId: null
}

const createCard  = (cardData, userId, deleteCard, likeCard, openCardImage, showError) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const titleElement = cardElement.querySelector('.card__title');
  const likeButtonElement = cardElement.querySelector('.card__like-button');
  const likesCountElement = cardElement.querySelector('.card__likes-count');
  const imageElement =  cardElement.querySelector('.card__image');
  const deleteButtonElement = cardElement.querySelector('.card__delete-button');

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;
  likesCountElement.textContent = cardData.likes.length;

  showUserLikes(cardData.likes, userId, likeButtonElement);

  if(userId === cardData.owner._id){
    deleteButtonElement.addEventListener('click', () => deleteCard(cardElement, cardData._id));
    deleteButtonElement.classList.add('card__delete-button_visible');
  }
  likeButtonElement.addEventListener('click', () => likeCard(cardData._id, likeButtonElement, likesCountElement, showError));
  imageElement.addEventListener('click', () => openCardImage(cardData));

  return cardElement;
}

const openDeletePopup = (card, cardId) => {
  openModal(deletePopup);
  cardToDeleted.cardElement = card;
  cardToDeleted.cardId = cardId;
}

const likeCard = (cardId, likeButtonElement, likesCountElement, showError) => {
  if(isLikeButtonActive(likeButtonElement))
  {
    deleteLike(cardId)
      .then(res => {
        likeButtonElement.classList.remove('card__like-button_is-active');
        likesCountElement.textContent = res.likes.length;
      })
      .catch(err => {
        showError(err);
      }); 
  }
  else 
  {
    putLike(cardId)
      .then(res => {
        likeButtonElement.classList.add('card__like-button_is-active');
        likesCountElement.textContent = res.likes.length;
      })
      .catch(err => {
        showError(err);
      }); 
  }
}

const showUserLikes = (likes, userId, likeButtonElement) => {
  if(hasUserLike(likes, userId))
    likeButtonElement.classList.add('card__like-button_is-active');
  else
    likeButtonElement.classList.remove('card__like-button_is-active');
}

const hasUserLike = (likes, userId) => {
  return likes.some(like => like._id === userId);
}

const isLikeButtonActive = (likeButtonElement) => {
  return likeButtonElement.classList.contains('card__like-button_is-active');
}

export {createCard, openDeletePopup, likeCard, cardToDeleted};