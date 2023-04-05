export default class UserInfo {
    constructor(userName, userInfo, userAvatar) {
        this._userName = userName
        this._userInfo = userInfo
        this._userAvatar = userAvatar
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userInfo: this._userInfo.textContent
          };
    }

    setUserInfo(profileData) {
        this._userName.textContent = profileData.name;
        this._userInfo.textContent = profileData.about;
        this._userAvatar.setAttribute("src", profileData.avatar);
        this._userAvatar.setAttribute("alt", profileData.name);
    }
}