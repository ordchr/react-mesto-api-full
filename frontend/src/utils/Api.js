class Api {
  constructor({baseUrl, headersAuthorization}) {
    this._baseUrl = baseUrl;
    this._headersAuthorization = headersAuthorization;
    this._call = this._call.bind(this);
  }

  // другие методы работы с API

  _call(method, action, body) {
    const requestData = {
      method: method,
      headers: {
        authorization: this._headersAuthorization,
        'Content-Type': 'application/json'
      },
    };
    if (body) {
      requestData.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}/${action}`, requestData).then(
        res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      );
  }

  getUserInfo() {
    return this._call('GET', 'users/me');
  }

  updateUserInfo(body) {
    return this._call('PATCH', 'users/me', body);
  }

  getInitialCards() {
    return this._call('GET', 'cards');
  }

  addCard(body) {
    return this._call('POST', 'cards', body);
  }

  deleteCard(cardId) {
    return this._call('DELETE', `cards/${cardId}`);
  }

  likeCard(cardId) {
    return this._call('PUT', `cards/likes/${cardId}`);
  }

  dislikeCard(cardId) {
    return this._call('DELETE', `cards/likes/${cardId}`);
  }

  updateAvatar(body) {
    return this._call('PATCH', `users/me/avatar`, body);
  }

  changeLikeStatus(cardId, newStatus) {
    if (newStatus) {
      return this.likeCard(cardId)
    } else {
      return this.dislikeCard(cardId)
    }
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14', 
  headersAuthorization: 'e334a560-7923-4c10-ad97-03986e985b68'
});

export default api;
