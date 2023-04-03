import { openPopup, closePopup } from "./modal.js"
// import { updateAvatarAtServer } from "./api"
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
const popupAvatarEdit = document.querySelector('.popup_avatar-edit');
const profileAvatarBlock = document.querySelector('.profile__avatar');
const profileAvatar = document.querySelector('.profile__avatar-img');


const formAvatarEdit = popupAvatarEdit.querySelector(".edit-avatar__form");
const fieldAvatar = formAvatarEdit.querySelector(".edit-avatar__avatar");
const buttonAvatarSave = formAvatarEdit.querySelector(".form__button");

function setFieldsToEditAvatarForm() {
    fieldAvatar.value = "";
}

profileAvatarBlock.addEventListener("click", function () {
    setFieldsToEditAvatarForm(); // вынос кода в отдельный метод делает его более читаемым. Согласно рекомендациям Боба Мартина Чистый Код
    openPopup(popupAvatarEdit);
});

function addEventsToAvatarForm() {
    formAvatarEdit.addEventListener("submit", function (event) {
        event.preventDefault();
        buttonAvatarSave.textContent = "Сохранение...";
        (new Api(apiConfig)).updateAvatarAtServer(fieldAvatar.value).then(() => {
            profileAvatar.setAttribute('src', fieldAvatar.value);
            closePopup(popupAvatarEdit);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            buttonAvatarSave.textContent = "Сохранить";
        });

    });
}


export { addEventsToAvatarForm };