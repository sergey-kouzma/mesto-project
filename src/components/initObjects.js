import { Api } from '../components/Api';
import { apiConfig } from '../components/utils/api-consts';
import Section from '../components/Section';
import createCard from '../components/createCard';
import { profileName, profileDescription, profileAvatar, cardsContainer } from '../components/utils/const';
import UserInfo from '../components/UserInfo';

const api = new Api(apiConfig);

const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

const cardList = new Section({
    renderer: (item, userId) => {
        cardList.addItem(createCard(item, userId));
    }
}, cardsContainer)



export {api, cardList, userInfo};