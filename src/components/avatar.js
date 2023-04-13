import { PopupWithForm } from "./PopupWithForm.js";
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
import { validationConfig } from './consts/validation-consts.js';
import FormValidation from './FormValidation.js';

function initAvatarWork(userInfo) {
    console.log(1);
    const avatarValidator = new FormValidation(validationConfig, document.querySelector('.edit-avatar__form'));
    avatarValidator.enableValidation();
    const avatarProfilePopup = new PopupWithForm('.popup_avatar-edit', saveAvatar, avatarValidator);
    console.log(2);
    const profileAvatarBlock = document.querySelector('.profile__avatar');

    profileAvatarBlock.addEventListener("click", function () {
        avatarProfilePopup.open();
    });

    function saveAvatar(data) {
        (new Api(apiConfig)).updateAvatarAtServer(data.img)
        .then((profileData) => {
            userInfo.setUserInfo(profileData)
            avatarProfilePopup.close();
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            editProfilePopup.resetLoadingStatus();
        });
    }
}

export { initAvatarWork };