import '../pages/index.css';
import {createCard, likeCard} from './card';
import {openModal, closeModal, clickPopup} from './modal';
import { enableValidation, clearValidation } from './validation';
import { getInitialCards, postNewCard, deleteCard, getUserInfo, patchUserInfo, patchUserAvatar } from './api';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardToDeleted = {
  cardElement: null,
  cardId: null
}

//DOM узлы
const cardsContainer = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const deleteButton = document.querySelector('.popup__button_type_delete');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const deletePopup = document.querySelector('.popup_type_delete-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const errorPopup = document.querySelector('.popup_type_error');

const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const imageInImagePopup = imagePopup.querySelector('.popup__image');
const captionInImagePopup = imagePopup.querySelector('.popup__caption');

const nameInEditForm = editForm.elements.name;
const descriptionInEditForm = editForm.elements.description;

const placeNameInAddForm = addForm.elements['place-name'];
const linkInAddForm = addForm.elements.link;

const linkInAvatarForm = avatarForm.elements.link;

const popupMessage = document.querySelector('.popup__message');

//Слушатели событий
editButton.addEventListener('click', () => {
  nameInEditForm.value = profileTitle.textContent;
  descriptionInEditForm.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig, true);
  openModal(editPopup);
});
addButton.addEventListener('click', () => openModal(addPopup));
deleteButton.addEventListener('click', () => confirmDeletion(cardToDeleted));
profileImage.addEventListener('click', () => openModal(avatarPopup));

editForm.addEventListener('submit', (evt) => editFormSubmit(evt));
addForm.addEventListener('submit', (evt) => addFormSubmit(evt));
avatarPopup.addEventListener('submit', (evt) => avatarPopupSubmit(evt));

editPopup.addEventListener('click', clickPopup);
addPopup.addEventListener('click', clickPopup);
deletePopup.addEventListener('click', clickPopup);
imagePopup.addEventListener('click', clickPopup);
avatarPopup.addEventListener('click', clickPopup);
errorPopup.addEventListener('click', clickPopup);

/**
 * Функция открытия изображения карточки
 * @function
 * @param {object} imageData - данные картинки: ссылка на нее, ее описание
 */

const openDeletePopup = (card, cardId) => {
  openModal(deletePopup);
  cardToDeleted.cardElement = card;
  cardToDeleted.cardId = cardId;
}

const confirmDeletion = ({cardElement, cardId}) => {
  deleteCard(cardId)
    .then(res => {
      cardElement.remove();
    })
    .catch(err => {
      console.log(err);
    })
    closeModal(deletePopup);
}

const openCardImage = (imageData) => {
  imageInImagePopup.src = imageData.link;
  imageInImagePopup.alt = imageData.name;
  captionInImagePopup.textContent = imageData.name;

  openModal(imagePopup);
}

const showError = (err) => {
  popupMessage.textContent = err;
  openModal(errorPopup);
}

const setUserInfo = (name, description, avatar = null) => {
  profileTitle.textContent = name;
  profileDescription.textContent = description;

  if(avatar)
    profileImage.style.backgroundImage = `url(${avatar})`;
}

/**
 * Обработчик отправки формы редактирования профиля
 * @function
 * @param {object} evt - событие отправки формы редактирования
 */
const editFormSubmit = (evt) => {
  evt.preventDefault();
  patchUserInfo({name: nameInEditForm.value, about: descriptionInEditForm.value})
    .then(res => {
      setUserInfo(res.name, res.about);
    })
    .catch(err => {
      showError(err);
    });
  closeModal(editPopup);
}

/**
 * Обработчик отправки формы дабваления новой карточки
 * @function
 * @param {object} evt - событие добавления новой карточки
 */
const addFormSubmit = (evt) => {
  evt.preventDefault();
  postNewCard({name: placeNameInAddForm.value, link: linkInAddForm.value})
    .then(card => {
      cardsContainer.prepend(createCard(card, card.owner._id, openDeletePopup, likeCard, openCardImage));
    })
    .catch(err => {
      showError(err);
    });
  addForm.reset();
  clearValidation(addForm, validationConfig);
  closeModal(addPopup);
}

const avatarPopupSubmit = (evt) => {
  evt.preventDefault();
  patchUserAvatar(linkInAvatarForm.value)
    .then(user => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch(err => {
      showError(err);
    });

  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  closeModal(avatarPopup);
}

enableValidation(validationConfig); 

const promises = [getInitialCards(), getUserInfo()];
Promise.all(promises)
  .then(([cards, user]) => {
    cardsContainer.append(...cards.map(card => createCard(card, user._id, openDeletePopup, likeCard, openCardImage, showError)));
    setUserInfo(user.name, user.about, user.avatar);
  })
  .catch(err => {
    showError(err);
  });
