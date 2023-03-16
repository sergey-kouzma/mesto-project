import { openPopup, closePopup } from "./modal.js"
import {updateAvatarAtServer} from "./api"

const popupAvatarEdit = document.querySelector('.popup_avatar-edit');
const profileAvatar = document.querySelector('.profile__avatar');


const formAvatarEdit = popupAvatarEdit.querySelector(".edit-avatar__form");
const fieldAvatar = formAvatarEdit.querySelector(".edit-avatar__avatar");
const buttonAvatarSave = formAvatarEdit.querySelector(".form__button");

function setFieldsToEditAvatarForm() {
    fieldAvatar.value = profileAvatar.getAttribute('src');
}

profileAvatar.addEventListener("click", function () {
    setFieldsToEditAvatarForm(); // вынос кода в отдельный метод делает его более читаемым. Согласно рекомендациям Боба Мартина Чистый Код
    openPopup(popupAvatarEdit);
});

function addEventsToAvatarForm() {
    formAvatarEdit.addEventListener("submit", function (event) {
        event.preventDefault();
        profileAvatar.setAttribute('src', fieldAvatar.value);
        buttonAvatarSave.textContent = "Сохранение...";
        updateAvatarAtServer(fieldAvatar.value).then(() => {
            buttonAvatarSave.textContent = "Сохранить";
            closePopup(popupAvatarEdit);
        });
        
    });
}


export { addEventsToAvatarForm };