import './index.css';
import { Api } from '../components/Api';
import { apiConfig } from '../components/utils/api-consts';
import { setInitialCards } from "../components/Card"
import { initProfileWork } from "../components/profile"
import { initPlacesAdding } from "../components/place"
import { initAvatarWork } from "../components/avatar"
import { validationConfig } from "../components/utils/validation-consts";
import { profileName, profileDescription, profileAvatar, forms } from '../components/utils/const';
import FormValidation from '../components/FormValidation';
import UserInfo from '../components/UserInfo';

const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

const api = new Api(apiConfig);
Promise.all([                 //в Promise.all передаем массив промисов которые нужно выполнить 
api.getProfileInfoFromServer(),
api.getInitialCards()])
.then(([profileData, initialCards]) => {    //попадаем сюда, когда оба промиса будут выполнены, деструктурируем ответ
    userInfo.setUserInfo(profileData);
    const cardList = setInitialCards(initialCards, profileData._id);
    initPlacesAdding(cardList);
})
.catch((err) => {       //попадаем сюда если один из промисов завершится ошибкой 
    console.log(err);
});

forms.forEach((form) => {
    const formValidation = new FormValidation(validationConfig, form);
    formValidation.enableValidation();
});

initProfileWork(userInfo);
initAvatarWork(userInfo);