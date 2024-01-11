import '../pages/index.css';
import initialCards from './cards';
import {createCard, deleteCard, likeCard} from './card';
import {openModal, closeModal} from './modal';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];

// @todo: Слушатели событий
editButton.addEventListener('click', () => {
  editForm.elements.name.value = document.querySelector('.profile__title').textContent;
  editForm.elements.description.value = document.querySelector('.profile__description').textContent;
  openModal(editPopup);
});
addButton.addEventListener('click', () => {openModal(addPopup)});
editForm.addEventListener('submit', (evt) => editFormSubmit(evt));
addForm.addEventListener('submit', (evt) => addFormSubmit(evt));

// @todo: Функция открытия изображения карточки
const openCardImage = (imageData) => {
  imagePopup.querySelector('.popup__image').src = imageData.link;
  imagePopup.querySelector('.popup__image').alt = imageData.name;
  imagePopup.querySelector('.popup__caption').textContent = imageData.name;

  openModal(imagePopup);
}

// @todo: Обработчик отправки формы редактирования профиля
const editFormSubmit = (evt) => {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = editForm.elements.name.value;
  document.querySelector('.profile__description').textContent = editForm.elements.description.value;
  closeModal(editPopup);
}

// @todo: Обработчик отправки формы дабваления новой карточки
const addFormSubmit = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: addForm.elements['place-name'].value,
    link: addForm.elements.link.value
  }
  const newCard = createCard(cardData, deleteCard, likeCard, openCardImage);
  cardsContainer.prepend(newCard);
  addForm.reset();
  closeModal(addPopup);
}

// @todo: Вывод карточек на страницу
cardsContainer.append(...initialCards.map(card => createCard(card, deleteCard, likeCard, openCardImage)));