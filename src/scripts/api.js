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