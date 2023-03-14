import { openPopup } from "./modal.js"

// Часть, которая относится к карточке
// Оставил здесь, а не вверху файла, чтобы легче было потом выносить в отдельный файл, когда такая задача будет
const cardsContainer = document.querySelector(".elements");
// const cardTemplate = document.querySelector("#card-template").content;
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const popupWithBigImage = document.querySelector('.popup_big-image');
const bigImg = popupWithBigImage.querySelector(".full-picture__img");
const bigImgText = popupWithBigImage.querySelector(".full-picture__text");


function addCard(cardInitData) {
  const cardElement = createCard(cardInitData);
  renderCard(cardElement);
}

function openBigImage(imageData) {
  bigImg.setAttribute("src", imageData.link);
  bigImg.setAttribute("alt", imageData.title);
  bigImgText.textContent = imageData.title;
  openPopup(popupWithBigImage);
}
function createCard(cardInitData) {
  const title = cardInitData.title;
  const link = cardInitData.link;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__img");
  const blockName = cardElement.querySelector(".card__header");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDelete = cardElement.querySelector(".card__delete");
  cardImg.setAttribute("src", link);
  cardImg.setAttribute("alt", title);
  blockName.textContent = title;

  cardDelete.addEventListener("click", function () {
    cardDelete.closest('.card').remove();
  });
  cardImg.addEventListener("click", () => openBigImage({ title, link }));
  cardLike.addEventListener("click", function () {
    cardLike.classList.toggle("card__like_active");
  });

  return cardElement;
}

function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}
function initCardsList(cardsList) {
  cardsList.forEach(function (element) {
    addCard({
      title: element.name,
      link: element.link
    });
  });
}

export { addCard, initCardsList };