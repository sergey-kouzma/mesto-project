// import { openPopup, closePopup } from "./modal.js"
// import { updateProfileServerData } from "./api"
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";

const popupProfileEdit = document.querySelector('.popup_profile-edit');
const buttonProfileEdit = document.querySelector(".profile__edit-button");

const profile = document.querySelector(".profile");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar-img");


const formProfileEdit = popupProfileEdit.querySelector(".edit-profile__form");
const fieldProfileName = popupProfileEdit.querySelector(".edit-profile__name");
const fieldProfileDescription = popupProfileEdit.querySelector(".edit-profile__description");
const buttonProfileSave = popupProfileEdit.querySelector(".form__button");

function setFieldsToEditProfileForm() {
    fieldProfileName.value = profileName.textContent;
    fieldProfileDescription.value = profileDescription.textContent;
}

buttonProfileEdit.addEventListener("click", function () {
    setFieldsToEditProfileForm(); // вынос кода в отдельный метод делает его более читаемым. Согласно рекомендациям Боба Мартина Чистый Код
    // openPopup(popupProfileEdit);
});

function addEventsToProfileForm() {
    formProfileEdit.addEventListener("submit", function (event) {
        event.preventDefault();

        buttonProfileSave.textContent = "Сохранение...";
        (new Api(apiConfig)).updateProfileServerData(fieldProfileName.value, fieldProfileDescription.value).then(() => {
            profileName.textContent = fieldProfileName.value;
            profileDescription.textContent = fieldProfileDescription.value;
            // closePopup(popupProfileEdit);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            buttonProfileSave.textContent = "Сохранить";
        });

    });
}


function setProfileData(profileData) {
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.setAttribute("src", profileData.avatar);
    profileAvatar.setAttribute("alt", profileData.name);
}





export { addEventsToProfileForm, setProfileData };