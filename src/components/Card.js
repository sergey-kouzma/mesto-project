export default class Card {
  constructor(data, myId, cardSelector, handleCardClick, handleDeleteIconClick, handleSetLike, handleSetDislike) {
    this._link = data.link;
    this._title = data.name;
    this._id = data._id;
    this._likes = data.likes;
    this._totalLikes = data.likes.length;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleSetLike = handleSetLike;
    this._handleSetDislike = handleSetDislike;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _myCardChecker() {
    if (this._ownerId !== this._myId) {
      this._cardDelete.remove();
    }
  }

  _myLikeChecker() {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._cardLike.classList.add("card__like_active")
      }
    })
  }

  _addRemoveListener() {
    this._cardDelete.addEventListener("click", () => {
      this._handleDeleteIconClick(this, this._id);
    });
  }

  remove() {
    this._cardElement.remove();
  }

  _addLikesListener() {
    this._cardLike.addEventListener("click", () => {

      if (this._cardLike.classList.contains("card__like_active")) {
        this._handleSetDislike(this, this._id);
      }
      else {
        this._handleSetLike(this, this._id);
      }
    });
  }

  likeCard(data) {
    this._likes = data.likes;
    this._cardLikesAmount.textContent = this._likes.length;
    this._cardLike.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._addLikesListener();
    this._addRemoveListener();
    this._cardImg.addEventListener("click", () => this._handleCardClick(this._title, this._link));
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
    this._setEventListeners();

    return this._cardElement;
  }
}