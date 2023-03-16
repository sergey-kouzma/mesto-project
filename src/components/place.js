import { openPopup, closePopup } from "./modal.js"
import { addCardToSite } from "./card"
import { addCardToServer } from "./api.js";

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
    formAddPlace.addEventListener("submit", function (event) {
        event.preventDefault();
        // addCard({
        //     title: placeFieldName.value,
        //     link: placeFieldImg.value
        // });
        buttonSaveForm.textContent = "Сохранение...";
        addCardToServer({
            title: placeFieldName.value,
            link: placeFieldImg.value
        }).then((card) => {
            addCardToSite({
                title: card.name,
                link: card.link,
                likes: card.likes.length,
                id: card._id,
                ownerId: card.owner._id,
                hasOwnLike: false
              });
            buttonSaveForm.textContent = "Сохранить";
            formAddPlace.reset();
            closePopup(popupAddPlace);
        });
        // formAddPlace.reset();
        // closePopup(popupAddPlace);
    });
}
export { addEventsToPlaceForm };