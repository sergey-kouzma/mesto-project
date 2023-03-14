import { openPopup, closePopup } from "./modal.js"
import { addCard } from "./card"

const popupAddPlace = document.querySelector('.popup_place-add');
const buttonAddPlace = document.querySelector(".profile__plus");

const placeFieldImg = popupAddPlace.querySelector(".add-place__img")
const placeFieldName = popupAddPlace.querySelector(".add-place__name");
const formAddPlace = popupAddPlace.querySelector(".add-place__form");

buttonAddPlace.addEventListener("click", function () {
    openPopup(popupAddPlace);
});

function addEventsToPlaceForm() {
    formAddPlace.addEventListener("submit", function (event) {
        event.preventDefault();
        addCard({
            title: placeFieldName.value,
            link: placeFieldImg.value
        });
        formAddPlace.reset();
        closePopup(popupAddPlace);
    });
}
export { addEventsToPlaceForm };