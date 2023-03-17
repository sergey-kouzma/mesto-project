import { openPopup } from "./modal.js"
import { removeCardFromServer, sendLikeToCardToServer, sendDisLikeToCardToServer } from "./api"

// Часть, которая относится к карточке
// Оставил здесь, а не вверху файла, чтобы легче было потом выносить в отдельный файл, когда такая задача будет
const profile = document.querySelector(".profile");
const cardsContainer = document.querySelector(".elements");
// const cardTemplate = document.querySelector("#card-template").content;
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const popupWithBigImage = document.querySelector('.popup_big-image');
const bigImg = popupWithBigImage.querySelector(".full-picture__img");
const bigImgText = popupWithBigImage.querySelector(".full-picture__text");


function addCardToSite(cardInitData) {
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
  const cardLikesAmount = cardElement.querySelector(".card__likes-amount");
  const blockName = cardElement.querySelector(".card__header");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDelete = cardElement.querySelector(".card__delete");
  cardImg.setAttribute("src", link);
  cardImg.setAttribute("alt", title);
  blockName.textContent = title;



  cardDelete.addEventListener("click", function () {
    // const cardElement = cardDelete.closest('.card');
    removeCardFromServer(cardInitData.id).then(() => {
      cardElement.remove();
    }).catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });

  });
  cardImg.addEventListener("click", () => openBigImage({ title, link }));
  if (cardInitData.hasOwnLike) {
    cardLike.classList.add("card__like_active");
  }
  cardLike.addEventListener("click", function () {
    if (cardLike.classList.contains("card__like_active")) {
      sendDisLikeToCardToServer(cardInitData.id).then(card => {
        cardLikesAmount.textContent = card.likes.length;
        cardLike.classList.toggle("card__like_active");
      }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
    }
    else {
      sendLikeToCardToServer(cardInitData.id).then(card => {
        cardLikesAmount.textContent = card.likes.length;
        cardLike.classList.toggle("card__like_active");
      }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
    }
    
  });


  if (cardInitData.id) {
    //cardElement.dataset.id = cardInitData.id;
    cardLikesAmount.textContent = cardInitData.likes;

    if (!cardInitData.isOwnCard) {
      cardDelete.remove();
    }
  }


  return cardElement;
}

function renderCard(cardElement) {
  cardsContainer.prepend(cardElement);
}


function setInitialCards(cardsList, currentUserId) {
  // const profileId = profile.dataset.id;
  cardsList.forEach(function (card) {
    addCardToSite({
      title: card.name,
      link: card.link,
      likes: card.likes.length,
      id: card._id,
      ownerId: card.owner._id,
      // hasOwnLike: card.likes.find(item => item._id === profileId) != undefined
      hasOwnLike: card.likes.find(item => item._id === currentUserId) != undefined,
      isOwnCard: currentUserId === card.owner._id
    });
  });
}

export { addCardToSite, setInitialCards };