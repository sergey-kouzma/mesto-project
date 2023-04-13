import {api, cardList, userInfo} from "../components/initObjects"

export default function initPageData() {
function setInitialCards(data, myId) {
    cardList.renderItems(data.reverse(), myId);
    return cardList;
};

Promise.all([
    api.getProfileInfoFromServer(),
    api.getInitialCards()])
    .then(([profileData, initialCards]) => {
        userInfo.setUserInfo(profileData);
        setInitialCards(initialCards, profileData._id);
        
    })
    .catch((err) => {
        console.log(err);
    });
}