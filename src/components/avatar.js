import { PopupWithForm } from "./PopupWithForm.js";
import {api, userInfo} from "../components/initObjects"

export default function initAvatarWork() {
    const avatarProfilePopup = new PopupWithForm('.popup_avatar-edit', saveAvatar);

    const profileAvatarBlock = document.querySelector('.profile__avatar');

    profileAvatarBlock.addEventListener("click", function () {
        avatarProfilePopup.open();
    });

    function saveAvatar(data) {
        api.updateAvatarAtServer(data.img)
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