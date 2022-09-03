const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '21ec355f-df00-4771-88de-f3c59b8377f4',
    'Content-Type': 'application/json'
  }
}

function resolution(res) {
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(`Ошибка: ${res.status}`)
}

const getInfoUsers = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then(resolution)

}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(resolution)
}

const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(resolution)
}

const patchAddCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  }).then(resolution)
}

const patchAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  }).then(resolution)
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(resolution)
}

const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(resolution)
}

const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(resolution)
}

export {
  getInfoUsers,
  getInitialCards,
  patchProfile,
  patchAddCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
  patchAvatar
}
