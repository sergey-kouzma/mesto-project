import { Card } from "./Card"
import { Api } from "./Api.js";
import { apiConfig } from "./utils/api-consts.js";
import { PopupWithForm } from "./PopupWithForm";
import Section from "./Section"

const cardsContainer = '.elements';

function initPlacesAdding(cardList) {
    const popupPlace = new PopupWithForm(".popup_place-add", savePlace);
    const buttonAddPlace = document.querySelector(".profile__plus");

    buttonAddPlace.addEventListener("click", function () {
        popupPlace.open();
    });

    function savePlace(data) {
        (new Api(apiConfig)).addCardToServer({
            title: data.name,
            link: data.img
        }).then((card) => {
            (new Section({}, cardsContainer).addItem(new Card(card, card.owner._id).createCard()))
            popupPlace.close();
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            popupPlace.resetLoadingStatus();
        });
    };
}
export { initPlacesAdding };