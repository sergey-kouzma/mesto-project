import './../pages/index.css';
import { initialCards } from "./cards-list"
import { initCardsList } from "./card"
import { enableValidation } from "./validate";
import { addEventsToProfileForm } from "./profile"
import { addEventsToPlaceForm } from "./place"

initCardsList(initialCards);

addEventsToProfileForm();

addEventsToPlaceForm();

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__field',
    inputURLSelector: "add-place__img",
    submitButtonSelector: '.form__button',
    inactiveButtonSelector: 'form__button_disactive',
    errorClass: '.form__field-error'
});

