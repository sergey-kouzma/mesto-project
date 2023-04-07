import './../pages/index.css';
import { Api } from './Api';
import { apiConfig } from './consts/api-consts';
import { setInitialCards } from "./card"
import { addEventsToProfileForm, addEventsToEditButton } from "./profile"
import { addEventsToPlaceForm } from "./place"
import { addEventsToAvatarForm } from "./avatar"
import { validationConfig } from "./consts/validation-consts";
import { profileName, profileDescription, profileAvatar, forms } from './consts/const';
import FormValidation from './FormValidation';
import UserInfo from './UserInfo';
// import Section from './Section';
// import Card from './card';


const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

const api = new Api(apiConfig);
Promise.all([                 //в Promise.all передаем массив промисов которые нужно выполнить 
api.getProfileInfoFromServer(),
api.getInitialCards()])
.then(([profileData, initialCards]) => {    //попадаем сюда, когда оба промиса будут выполнены, деструктурируем ответ
    userInfo.setUserInfo(profileData);
    setInitialCards(initialCards, profileData._id);
})
.catch((err) => {       //попадаем сюда если один из промисов завершится ошибкой 
    console.log(err);
});

forms.forEach((form) => {
    const formValidation = new FormValidation(validationConfig, form);
    formValidation.enableValidation();
});

addEventsToProfileForm(userInfo);
addEventsToAvatarForm(userInfo);
addEventsToEditButton(userInfo);

addEventsToPlaceForm();