import { openPopup } from "./modal.js"
// import { removeCardFromServer, sendLikeToCardToServer, sendDisLikeToCardToServer } from "./api"
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
const profile = document.querySelector(".profile");
const cardsContainer = document.querySelector(".elements");
// const cardTemplate = document.querySelector("#card-template").content;
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const popupWithBigImage = document.querySelector('.popup_big-image');
const bigImg = popupWithBigImage.querySelector(".full-picture__img");
const bigImgText = popupWithBigImage.querySelector(".full-picture__text");

class Card {
  constructor({link, title, id, likes, isOwnCard, ownerId, hasOwnLike}) {
    this._link = link;
    this._title = title;
    this._id = id;
    this._likes = likes;
    this._isOwnCard = isOwnCard;
    this._ownerId = ownerId;
    this._hasOwnLike = hasOwnLike;
    // console.log(this);
  }

  addCardToSite() {
    this._createCard();
    this._renderCard();
  }

  _openBigImage() {
    bigImg.setAttribute("src", this._link);
    bigImg.setAttribute("alt", this._title);
    bigImgText.textContent = this._title;
    openPopup(popupWithBigImage);
  }

  _addRemoveListener() {
    this._cardDelete.addEventListener("click",  () =>  {
      (new Api(apiConfig)).removeCardFromServer(this._id).then(() => {
        this._cardElement.remove();
      }).catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
    });
  }

  _addLikesListener() {
    // console.log(this._cardLike);
    // console.log(this);
    this._cardLike.addEventListener("click", () => {
      
      if (this._cardLike.classList.contains("card__like_active")) {
        (new Api(apiConfig)).sendDisLikeToCardToServer(this._id).then(card => {
          this._cardLikesAmount.textContent = card.likes.length
          this._cardLike.classList.toggle("card__like_active");
        }).catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
      }
      else {
        (new Api(apiConfig)).sendLikeToCardToServer(this._id).then(card => {
          this._cardLikesAmount.textContent = card.likes.length
          this._cardLike.classList.toggle("card__like_active");
        }).catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
      }
    });
  }

  _createCard() {
    this._cardElement = cardTemplate.cloneNode(true);
    this._cardImg = this._cardElement.querySelector(".card__img");
    this._cardLikesAmount = this._cardElement.querySelector(".card__likes-amount");
    this._blockName = this._cardElement.querySelector(".card__header");
    this._cardLike = this._cardElement.querySelector(".card__like");
    this._cardDelete = this._cardElement.querySelector(".card__delete");
    if (!this._isOwnCard) {
        this._cardDelete.remove();
    }
    
    this._cardImg.setAttribute("src", this._link);
    this._cardImg.setAttribute("alt", this._title);
    this._blockName.textContent = this._title
    this._cardLikesAmount.textContent = this._likes;
    if (this._hasOwnLike) {
      this._cardLike.classList.add("card__like_active");
    }

    this._addLikesListener();
    this._addRemoveListener();


    this._cardImg.addEventListener("click", () => this._openBigImage());
 

 
 
  }
 
  _renderCard() {
    cardsContainer.prepend(this._cardElement);
  }
 
 
 
} 
 
 
function setInitialCards(cardsList, currentUserId) {
  const profileId = profile.dataset._id;
  cardsList.forEach(function (card) {
    new Card({
      title: card.name,
      link: card.link,
      likes: card.likes.length,
      id: card._id,
      ownerId: card.owner._id,
      // hasOwnLike: card.likes.find(item => item._id === profileId) != undefined
      hasOwnLike: card.likes.find(item => item._id === currentUserId) != undefined,
      isOwnCard: currentUserId === card.owner._id
    }).addCardToSite();
  });
} 
 
export { Card, setInitialCards };