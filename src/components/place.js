// import { openPopup, closePopup } from "./modal.js"
import { Card } from "./card"
// import { addCardToServer } from "./api.js";
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
import { PopupWithForm } from "./PopupWithForm";

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
            const createdCard = (new Card({
                title: card.name,
                link: card.link,
                likes: card.likes.length,
                id: card._id,
                ownerId: card.owner._id,
                hasOwnLike: false,
                isOwnCard: true
            })).createCard();
            cardList.addItem(createdCard);
            popupPlace.close();
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            popupPlace.resetLoadingStatus();
            // buttonSaveForm.classList.add('form__button_disactive');
            // buttonSaveForm.setAttribute("disabled", "disabled");
        });
    }
}
export { initPlacesAdding };