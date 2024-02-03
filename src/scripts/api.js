const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: '81c30f4e-f21f-41d1-bb53-640856107945',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
    });
} 

export const postNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
    });
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
    });
}

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId} `, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
    });
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId} `, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
    });
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
    });
}

export const patchUserInfo = (userInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about
    })
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
    });
}

export const patchUserAvatar = (userAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatar
    })
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
    });
}