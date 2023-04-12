import './index.css';
import { Api } from '../components/Api';
import { apiConfig } from '../components/utils/api-consts';
import { initProfileWork } from "../components/profile"
// import { initPlacesAdding } from "../components/place"
import { initAvatarWork } from "../components/avatar"
import { validationConfig } from "../components/utils/validation-consts";
import { profileName, profileDescription, profileAvatar, forms, cardsContainer, cardSelector } from '../components/utils/const';
import FormValidation from '../components/FormValidation';
import UserInfo from '../components/UserInfo';
import Card from '../components/Card';
import Section from '../components/Section';
import { PopupWithForm } from "../components/PopupWithForm";


function createCard(item, userId) {
    const card = new Card(item, userId, cardSelector).createCard();
    return card
};

const cardList = new Section({
    renderer: (item, userId) => {
        cardList.addItem(createCard(item, userId));
    }
}, cardsContainer)


function setInitialCards(data, myId) {
    cardList.renderItems(data.reverse(), myId);
    return cardList;
};

function initPlacesAdding() {
    const popupPlace = new PopupWithForm(".popup_place-add", savePlace);
    const buttonAddPlace = document.querySelector(".profile__plus");

    buttonAddPlace.addEventListener("click", function () {
        popupPlace.open();
    });

    function savePlace(data) {
        api.addCardToServer({
            title: data.name,
            link: data.img
        }).then((card) => {
            cardList.addItem(createCard(card, card.owner._id))
            popupPlace.close();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            popupPlace.resetLoadingStatus();
        });
    };
}


const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

const api = new Api(apiConfig);

Promise.all([
    api.getProfileInfoFromServer(),
    api.getInitialCards()])
    .then(([profileData, initialCards]) => {
        userInfo.setUserInfo(profileData);
        setInitialCards(initialCards, profileData._id);
        initPlacesAdding();
    })
    .catch((err) => {
        console.log(err);
});

forms.forEach((form) => {
    const formValidation = new FormValidation(validationConfig, form);
    formValidation.enableValidation();
});

initProfileWork(userInfo);
initAvatarWork(userInfo);