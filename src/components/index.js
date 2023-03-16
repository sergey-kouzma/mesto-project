import './../pages/index.css';
import {getInitialCards} from "./api";
import { setInitialCards } from "./card"
import { enableValidation } from "./validate";
import { addEventsToProfileForm, setProfileInfoFromServer } from "./profile"
import { addEventsToPlaceForm } from "./place"
import { addEventsToAvatarForm } from "./avatar"

setProfileInfoFromServer().then(() => getInitialCards().then((initialCards) => setInitialCards(initialCards)));




addEventsToProfileForm();

addEventsToPlaceForm();
addEventsToAvatarForm();

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__field',
    inputURLSelector: "add-place__img",
    submitButtonSelector: '.form__button',
    inactiveButtonSelector: 'form__button_disactive',
    errorClass: '.form__field-error'
});



