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
      
      return Promise.reject(`Ошибка: ${res.status}`);
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
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok)
        return res.json();
      
      return Promise.reject(`Ошибка: ${res.status}`);
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
      
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}