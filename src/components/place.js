import { openPopup, closePopup } from "./modal.js"
import { Card } from "./card"
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
import { renderLoading } from './utils/utils.js'
import { setInitialCards } from "./card"

const popupAddPlace = document.querySelector('.popup_place-add');
const buttonAddPlace = document.querySelector(".profile__plus");

const placeFieldImg = popupAddPlace.querySelector(".add-place__img")
const placeFieldName = popupAddPlace.querySelector(".add-place__name");
const formAddPlace = popupAddPlace.querySelector(".add-place__form");
const buttonSaveForm = popupAddPlace.querySelector(".form__button");

buttonAddPlace.addEventListener("click", function () {
    openPopup(popupAddPlace);
});

function addEventsToPlaceForm() {
    formAddPlace.addEventListener("submit", function (evt) {
        evt.preventDefault();
        renderLoading(evt, true);
        (new Api(apiConfig)).addCardToServer({
            title: placeFieldName.value,
            link: placeFieldImg.value
        }).then((card) => {
            setInitialCards(card, card._id)
            formAddPlace.reset();
            closePopup(popupAddPlace);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            renderLoading(evt, true);
            buttonSaveForm.classList.add('form__button_disactive');
            buttonSaveForm.setAttribute("disabled", "disabled");
        });
    });
}
export { addEventsToPlaceForm };