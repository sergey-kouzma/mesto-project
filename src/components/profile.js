import { PopupWithForm } from './PopupWithForm.js';
import {api, userInfo} from "../components/initObjects"

export default function initProfileWork() {
    const editProfilePopup = new PopupWithForm('.popup_profile-edit', saveProfileData, setFieldsToEditProfileForm);

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
        const { userName, userDescription } = userInfo.getUserInfo()
        fieldProfileName.value = userName;
        fieldProfileDescription.value = userDescription;
    }

    function saveProfileData(data) {
        api.updateProfileServerData(data.name, data.description).then((profileData) => {
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
