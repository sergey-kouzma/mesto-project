import {api, cardList} from "../components/initObjects";
import { PopupWithForm } from "./PopupWithForm";
import createCard from '../components/createCard';

export default function initPlacesAdding() {
    const popupPlace = new PopupWithForm(".popup_place-add", savePlace);
    const buttonAddPlace = document.querySelector(".profile__plus");

    buttonAddPlace.addEventListener("click", function () {
        popupPlace.open();
    });

    function savePlace(data) {
        api.addCardToServer({
            title: data.name,
            link: data.img
        }).then((card) => {
            cardList.addItem(createCard(card, card.owner._id))
            popupPlace.close();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            popupPlace.resetLoadingStatus();
        });
    };
}
