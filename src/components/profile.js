import { openPopup, closePopup } from "./modal.js"
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
import { profileName, profileDescription, profileAvatar } from './consts/const';
import UserInfo from './UserInfo';
import { renderLoading } from './utils/utils.js'

const popupProfileEdit = document.querySelector('.popup_profile-edit');
const buttonProfileEdit = document.querySelector(".profile__edit-button");

const formProfileEdit = popupProfileEdit.querySelector(".edit-profile__form");
const fieldProfileName = popupProfileEdit.querySelector(".edit-profile__name");
const fieldProfileDescription = popupProfileEdit.querySelector(".edit-profile__description");

const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

function setFieldsToEditProfileForm() {
    fieldProfileName.value = profileName.textContent;
    fieldProfileDescription.value = profileDescription.textContent;
}

buttonProfileEdit.addEventListener("click", function () {
    setFieldsToEditProfileForm(); // вынос кода в отдельный метод делает его более читаемым. Согласно рекомендациям Боба Мартина Чистый Код
    openPopup(popupProfileEdit);
});



const addEventsToProfileForm = () => {
    formProfileEdit.addEventListener("submit", function (evt) {
        evt.preventDefault();
        renderLoading(evt, true);
        (new Api(apiConfig)).updateProfileServerData(fieldProfileName.value, fieldProfileDescription.value)
        .then((profileData) => {
            userInfo.setUserInfo(profileData)
            closePopup(popupProfileEdit);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            renderLoading(evt, false)
        });

    });
}

export { addEventsToProfileForm };