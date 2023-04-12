
export class Api {
    constructor({baseUrl, authorizationToken}) {
        this._baseUrl = baseUrl;
        this._headers = {
            'authorization': authorizationToken,
            'Content-Type': 'application/json'
        };
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    } 

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
            .then(this._getResponseData);
    }

    removeCardFromServer(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._getResponseData);
    }

    addCardToServer(cardInitData) {
        const title = cardInitData.title;
        const link = cardInitData.link;
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                link: link
            })
        }).then(this._getResponseData);
    }

    updateProfileServerData(name, description) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        }).then(this._getResponseData);
    }

    getProfileInfoFromServer() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        }).then(this._getResponseData);
    }

    sendLikeToCardToServer(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + cardId, {
            method: 'PUT',
            headers: this._headers
        }).then(this._getResponseData);
    }

    sendDisLikeToCardToServer(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + cardId, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._getResponseData);
    }


    updateAvatarAtServer(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(this._getResponseData);
    }
}