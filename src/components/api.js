const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
      authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f',
      'Content-Type': 'application/json'
    }
  }

 function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
} 

export const getInitialCards = () => {
    return fetch(config.baseUrl + '/cards', {
        headers: config.headers
    })
        .then(getResponseData);
}

export const removeCardFromServer = (cardId) => {
    return fetch(config.baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    }).then(getResponseData);
}

export const addCardToServer = (cardInitData) => {
    const title = cardInitData.title;
    const link = cardInitData.link;
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: title,
            link: link
        })
    }).then(getResponseData);
}

export const updateProfileServerData = (name, description) => {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    }).then(getResponseData);
}

export const getProfileInfoFromServer = () => {
    return fetch(config.baseUrl + '/users/me', {
        headers: config.headers
    }).then(getResponseData);
}

export const sendLikeToCardToServer = (cardId) => {
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers
    }).then(getResponseData);
}

export const sendDisLikeToCardToServer = (cardId) => {
    return fetch(config.baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    }).then(getResponseData);
}


export const updateAvatarAtServer = (avatar) => {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    }).then(getResponseData);
}