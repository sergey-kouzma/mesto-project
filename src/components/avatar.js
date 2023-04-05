import { openPopup, closePopup } from "./modal.js"
import { Api } from "./Api.js";
import { apiConfig } from "./consts/api-consts.js";
import { renderLoading } from './utils/utils.js';

const popupAvatarEdit = document.querySelector('.popup_avatar-edit');
const profileAvatarBlock = document.querySelector('.profile__avatar');

const formAvatarEdit = popupAvatarEdit.querySelector(".edit-avatar__form");
const fieldAvatar = formAvatarEdit.querySelector(".edit-avatar__avatar");

profileAvatarBlock.addEventListener("click", function () {
    openPopup(popupAvatarEdit);
});

function addEventsToAvatarForm(userInfo) {
    formAvatarEdit.addEventListener("submit", function (evt) {
        evt.preventDefault();
        renderLoading(evt, true);
        (new Api(apiConfig)).updateAvatarAtServer(fieldAvatar.value)
        .then((profileData) => {
            userInfo.setUserInfo(profileData)
            formAvatarEdit.reset();
            closePopup(popupAvatarEdit);
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        }).finally(() => {
            renderLoading(evt, false)
        });

    });
}


export { addEventsToAvatarForm };