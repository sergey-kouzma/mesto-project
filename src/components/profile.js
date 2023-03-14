import { openPopup, closePopup } from "./modal.js"

const popupProfileEdit = document.querySelector('.popup_profile-edit');
const buttonProfileEdit = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const formProfileEdit = popupProfileEdit.querySelector(".edit-profile__form");
const fieldProfileName = popupProfileEdit.querySelector(".edit-profile__name");
const fieldProfileDescription = popupProfileEdit.querySelector(".edit-profile__description");

function setFieldsToEditProfileForm() {
    fieldProfileName.value = profileName.textContent;
    fieldProfileDescription.value = profileDescription.textContent;
}

buttonProfileEdit.addEventListener("click", function () {
    setFieldsToEditProfileForm(); // вынос кода в отдельный метод делает его более читаемым. Согласно рекомендациям Боба Мартина Чистый Код
    openPopup(popupProfileEdit);
});

function addEventsToProfileForm() {
    formProfileEdit.addEventListener("submit", function (event) {
        event.preventDefault();
        profileName.textContent = fieldProfileName.value;
        profileDescription.textContent = fieldProfileDescription.value;
        closePopup(popupProfileEdit);
    });
}

export { addEventsToProfileForm };