import { openPopup } from "./modal.js"
// import { removeCardFromServer, sendLikeToCardToServer, sendDisLikeToCardToServer } from "./api"
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
import Section from './Section';

// const profile = document.querySelector(".profile");
const cardsContainer = '.elements';
// const cardTemplate = document.querySelector("#card-template").content;
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const popupWithBigImage = document.querySelector('.popup_big-image');
const bigImg = popupWithBigImage.querySelector(".full-picture__img");
const bigImgText = popupWithBigImage.querySelector(".full-picture__text");

export default class Card {
  constructor({link, title, id, likes, isOwnCard, ownerId, hasOwnLike}) {
    this._link = link;
    this._title = title;
    this._id = id;
    this._likes = likes;
    this._isOwnCard = isOwnCard;
    this._ownerId = ownerId;
    this._hasOwnLike = hasOwnLike;
  }

  // addCardToSite() {
  //   this.createCard();
  //   this._renderCard();
  // }

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

  createCard() {
    const cardElement = cardTemplate.cloneNode(true);
    this._cardImg = cardElement.querySelector(".card__img");
    this._cardLikesAmount = cardElement.querySelector(".card__likes-amount");
    this._blockName = cardElement.querySelector(".card__header");
    this._cardLike = cardElement.querySelector(".card__like");
    this._cardDelete = cardElement.querySelector(".card__delete");
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

    return cardElement;
  }
 
  // _renderCard() {
  //   cardsContainer.prepend(this._cardElement);
  // }
} 
 
 
function setInitialCards(data, userId) {
  const cardList = new Section({
    renderer: (item) => {
      const card = new Card({
        title: item.name,
        link: item.link,
        likes: item.likes.length,
        id: item._id,
        ownerId: item.owner._id,
        hasOwnLike: item.likes.find(item => item._id === userId) != undefined,
        isOwnCard: userId === item.owner._id
      });
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }
  }, cardsContainer)
  cardList.renderItems(data)
} 

export { Card, setInitialCards };