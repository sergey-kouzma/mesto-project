import { cardSelector } from '../components/utils/const';
import Card from '../components/Card';
import PopupWithImage from "../components/PopupWithImage"
import {api} from "../components/initObjects"

const popupWithImage = new PopupWithImage('.popup_big-image');

export default function createCard(item, userId) {
    const card = new Card(item, userId, cardSelector, openBigImage, removeCard, likeCard, dislikeCard, dislikeCard).createCard();
    return card;
};

function openBigImage(title, link) {
    popupWithImage.open(title, link);
}

function removeCard(card, id) {
    api.removeCardFromServer(this._id)
        .then(() => {
            card.remove();
        }).catch(err => {
            console.log(err); // выводим ошибку в консоль
        });
}

function likeCard(card, id) {
    api.sendLikeToCardToServer(id)
        .then(likedCardData => {
            card.likeCard(likedCardData);
        }).catch(err => {
            console.log(err); // выводим ошибку в консоль
        });
}

function dislikeCard(card, id) {
    api.sendDisLikeToCardToServer(id)
        .then(likedCardData => {
            card.likeCard(likedCardData);
        }).catch(err => {
            console.log(err); // выводим ошибку в консоль
        });
}