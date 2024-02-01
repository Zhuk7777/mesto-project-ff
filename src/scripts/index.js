import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card';
import {openModal, closeModal, clickPopup} from './modal';
import { enableValidation, clearValidation } from './validation';
import { getInitialCards, postNewCard, getUserInfo, patchUserInfo } from './api';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const promises = [getInitialCards(), getUserInfo()];

//DOM узлы
const cardsContainer = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const imageInImagePopup = imagePopup.querySelector('.popup__image');
const captionInImagePopup = imagePopup.querySelector('.popup__caption');

const nameInEditForm = editForm.elements.name;
const descriptionInEditForm = editForm.elements.description;

const placeNameInAddForm = addForm.elements['place-name'];
const linkInAddForm = addForm.elements.link;

//Слушатели событий
editButton.addEventListener('click', () => {
  nameInEditForm.value = profileTitle.textContent;
  descriptionInEditForm.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig, true);
  openModal(editPopup);
});
addButton.addEventListener('click', () => {openModal(addPopup)});

editForm.addEventListener('submit', (evt) => editFormSubmit(evt));
addForm.addEventListener('submit', (evt) => addFormSubmit(evt));

editPopup.addEventListener('click', clickPopup);
addPopup.addEventListener('click', clickPopup);
imagePopup.addEventListener('click', clickPopup);

/**
 * Функция открытия изображения карточки
 * @function
 * @param {object} imageData - данные картинки: ссылка на нее, ее описание
 */
const openCardImage = (imageData) => {
  imageInImagePopup.src = imageData.link;
  imageInImagePopup.alt = imageData.name;
  captionInImagePopup.textContent = imageData.name;

  openModal(imagePopup);
}

const setUserInfo = (name, description) => {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
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
      console.log(err);
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
      cardsContainer.prepend(createCard(card, card.owner._id, deleteCard, likeCard, openCardImage));
    })
    .catch(err => {
      console.log(err);
    });
  addForm.reset();
  clearValidation(addForm, validationConfig);
  closeModal(addPopup);
}

enableValidation(validationConfig); 

Promise.all(promises)
  .then(([cards, user]) => {
    cardsContainer.append(...cards.map(card => createCard(card, user._id, deleteCard, likeCard, openCardImage)));
    setUserInfo(user.name, user.about);
  })
  .catch(err => {
    console.log(err);
  });
