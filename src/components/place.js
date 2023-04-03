import { openPopup, closePopup } from "./modal.js"
import { Card } from "./card"
// import { addCardToServer } from "./api.js";
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";

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
        (new Api(apiConfig)).addCardToServer({
            title: placeFieldName.value,
            link: placeFieldImg.value
        }).then((card) => {
            (new Card()).addCardToSite({
                title: card.name,
                link: card.link,
                likes: card.likes.length,
                id: card._id,
                ownerId: card.owner._id,
                hasOwnLike: false,
                isOwnCard: true
            });
            
            formAddPlace.reset();
            closePopup(popupAddPlace);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            buttonSaveForm.textContent = "Сохранить";
            buttonSaveForm.classList.add('form__button_disactive');
            buttonSaveForm.setAttribute("disabled", "disabled");
        });
        // formAddPlace.reset();
        // closePopup(popupAddPlace);
    });
}
export { addEventsToPlaceForm };