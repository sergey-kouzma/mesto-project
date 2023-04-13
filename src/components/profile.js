import {PopupWithForm} from './PopupWithForm.js';
import { validationConfig } from './consts/validation-consts.js';

import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
import FormValidation from './FormValidation.js';
function initProfileWork(userInfo) {
    const profileValidator = new FormValidation(validationConfig, document.querySelector('.edit-profile__form'));
    profileValidator.enableValidation();
    const editProfilePopup = new PopupWithForm('.popup_profile-edit', saveProfileData, profileValidator, setFieldsToEditProfileForm);

    const popupProfileEdit = document.querySelector('.popup_profile-edit');
    const buttonProfileEdit = document.querySelector(".profile__edit-button");

    const fieldProfileName = popupProfileEdit.querySelector(".edit-profile__name");
    const fieldProfileDescription = popupProfileEdit.querySelector(".edit-profile__description");

    function addEventsToEditButton() {
        buttonProfileEdit.addEventListener("click", function () {
            editProfilePopup.open();
        });
    }

    function setFieldsToEditProfileForm() {
        fieldProfileName.value = userInfo.getUserInfo().userName;
        fieldProfileDescription.value = userInfo.getUserInfo().userInfo;
    }

    function saveProfileData(data) {
        (new Api(apiConfig)).updateProfileServerData(data.name, data.description).then((profileData) => {
            userInfo.setUserInfo(profileData)
            editProfilePopup.close();
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            editProfilePopup.resetLoadingStatus();
        });
    }

    addEventsToEditButton();
}
export {initProfileWork};