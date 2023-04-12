import { PopupWithForm } from "./PopupWithForm.js";
import { Api } from "./Api.js";
import { apiConfig } from "./utils/api-consts.js";

function initAvatarWork(userInfo) {
    const avatarProfilePopup = new PopupWithForm('.popup_avatar-edit', saveAvatar);

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
            avatarProfilePopup.resetLoadingStatus();
        });
    }
}

export { initAvatarWork };