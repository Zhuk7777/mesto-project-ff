import '../pages/index.css';
import initialCards from './cards';
import {createCard, deleteCard, likeCard} from './card';
import {openModal, closeModal, clickPopup} from './modal';

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

/**
 * Обработчик отправки формы редактирования профиля
 * @function
 * @param {object} evt - событие отправки формы редактирования
 */
const editFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInEditForm.value;
  profileDescription.textContent = descriptionInEditForm.value;
  closeModal(editPopup);
}

/**
 * Обработчик отправки формы дабваления новой карточки
 * @function
 * @param {object} evt - событие добавления новой карточки
 */
const addFormSubmit = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: placeNameInAddForm.value,
    link: linkInAddForm.value
  }
  const newCard = createCard(cardData, deleteCard, likeCard, openCardImage);
  cardsContainer.prepend(newCard);
  addForm.reset();
  closeModal(addPopup);
}

//Вывод карточек на страницу
cardsContainer.append(...initialCards.map(card => createCard(card, deleteCard, likeCard, openCardImage)));