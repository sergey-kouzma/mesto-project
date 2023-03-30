import './../pages/index.css';
// import { getInitialCards, getProfileInfoFromServer } from "./api";
import { Api } from './Api';
import { apiConfig } from './consts/api-consts';
import { setInitialCards } from "./card"
import { enableValidation } from "./validate";
import { addEventsToProfileForm, setProfileData } from "./profile"
import { addEventsToPlaceForm } from "./place"
import { addEventsToAvatarForm } from "./avatar"
import { validationConfig, forms } from "./consts/validation-consts";
import FormValidation from './FormValidation';

const api = new Api(apiConfig);
Promise.all([                 //в Promise.all передаем массив промисов которые нужно выполнить 
    api.getProfileInfoFromServer(),
    api.getInitialCards()])
    .then(([profileData, initialCards]) => {    //попадаем сюда, когда оба промиса будут выполнены, деструктурируем ответ
        setProfileData(profileData);
        setInitialCards(initialCards, profileData._id);
    })
    .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
        console.log(err);
    });

// forms.forEach((form) => {
//     const profileFormValidation = new FormValidation(validationConfig, form);
//     profileFormValidation.enableValidation();
// });

enableValidation(validationConfig)
addEventsToProfileForm();

addEventsToPlaceForm();
addEventsToAvatarForm();



