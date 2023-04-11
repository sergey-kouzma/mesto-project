import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from './Section';

const cardsContainer = '.elements';

export default class Card {
  constructor(data, myId) {
    this._link = data.link;
    this._title = data.name;
    this._id = data._id;
    this._likes = data.likes;
    this._totalLikes = data.likes.length;
    this._ownerId = data.owner._id;
    this._myId = myId;
  }

  _getElement() {
    const cardElement = document
      .querySelector("#card-template")
      .content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _openBigImage() {
    // bigImg.setAttribute("src", this._link);
    // bigImg.setAttribute("alt", this._title);
    // bigImgText.textContent = this._title;
    (new PopupWithImage('.popup_big-image')).open(this._title, this._link);
    // openPopup(popupWithBigImage);
  }

  _myCardChecker() {
    if (this._ownerId !== this._myId) {
      this._cardDelete.remove();
    }
  }

  _myLikeChecker() {
    this._likes.forEach((like) => {
      if(like._id === this._myId) {
        this._cardLike.classList.add("card__like_active")
      }
    })
  }

  _addRemoveListener() {
    this._cardDelete.addEventListener("click",  () =>  {
      (new Api(apiConfig)).removeCardFromServer(this._id)
      .then(() => {
        this._cardElement.remove();
      }).catch(err => {
        console.log(err); // выводим ошибку в консоль
      });
    });
  }

  _addLikesListener() {
    this._cardLike.addEventListener("click", () => {
      
      if (this._cardLike.classList.contains("card__like_active")) {
        (new Api(apiConfig)).sendDisLikeToCardToServer(this._id)
        .then(card => {
          this._cardLikesAmount.textContent = card.likes.length
          this._cardLike.classList.toggle("card__like_active");
        }).catch(err => {
          console.log(err); // выводим ошибку в консоль
        });
      }
      else {
        (new Api(apiConfig)).sendLikeToCardToServer(this._id)
        .then(card => {
          this._cardLikesAmount.textContent = card.likes.length
          this._cardLike.classList.toggle("card__like_active");
        }).catch(err => {
          console.log(err); // выводим ошибку в консоль
        });
      }
    });
  }

  createCard() {
    this._cardElement = this._getElement();
    this._cardImg = this._cardElement.querySelector(".card__img");
    this._cardImg.src = this._link;
    this._cardImg.alt = this._title;
    this._cardLikesAmount = this._cardElement.querySelector(".card__likes-amount");
    this._cardLikesAmount.textContent = this._totalLikes;
    this._blockName = this._cardElement.querySelector(".card__header").textContent = this._title;
    this._cardLike = this._cardElement.querySelector(".card__like");
    this._cardDelete = this._cardElement.querySelector(".card__delete");
    
    this._myLikeChecker()
    this._myCardChecker();
    this._addLikesListener();
    this._addRemoveListener();
    this._cardImg.addEventListener("click", () => this._openBigImage());

    return this._cardElement;
  }
} 
 
function setInitialCards(data, userId) {
  const cardList = new Section({
    renderer: item => {
      const card = new Card(item, userId);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }
  }, cardsContainer)
  cardList.renderItems(data.reverse());
  return cardList;
} 

export { Card, setInitialCards };