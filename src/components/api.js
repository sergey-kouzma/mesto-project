export const getInitialCards = () => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
        headers: {
            authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        });
}

export const removeCardFromServer = (cardId) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f',
            'Content-Type': 'application/json'
        }
    });
}

export const addCardToServer = (cardInitData) => {
    const title = cardInitData.title;
    const link = cardInitData.link;
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
        method: 'POST',
        headers: {
            authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: title,
            link: link
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    });
}

export const updateProfileServerData = (name, description) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: description
        })
    });
}

export const getProfileInfoFromServer = () => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me', {
        headers: {
            authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    });
}

export const sendLikeToCardToServer = (cardId) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    });
}

export const sendDisLikeToCardToServer = (cardId) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f'
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    });
}


export const updateAvatarAtServer = (avatar) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-20/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '80e9e4a9-cb76-4d3a-873d-dfa824d8742f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    });
}