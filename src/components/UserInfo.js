export default class UserInfo {
    constructor(userName, userDescription, userAvatar) {
        this._userName = userName
        this._userDescription = userDescription
        this._userAvatar = userAvatar
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userDescription: this._userDescription.textContent
        };
    }

    setUserInfo(profileData) {
        this._userName.textContent = profileData.name;
        this._userDescription.textContent = profileData.about;
        this._userAvatar.setAttribute("src", profileData.avatar);
        this._userAvatar.setAttribute("alt", profileData.name);
    }
}