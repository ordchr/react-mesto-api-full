class Api {
  constructor({baseUrl, headersAuthorization}) {
    this._baseUrl = baseUrl;
    this._call = this._call.bind(this);
  }

  _call(method, action, body) {
    const requestData = {
      method: method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
    return this._call('PUT', `cards/${cardId}/likes`);
  }

  dislikeCard(cardId) {
    return this._call('DELETE', `cards/${cardId}/likes`);
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

  register(body) {
    return this._call('POST', 'signup', body);
  }

  login(body) {
    return this._call('POST', 'signin', body);
  }

  validateToken(jwt) {
    return this._call('GET', 'users/me', "", {
      "Authorization" : `Bearer ${jwt}`
    });
  }

}

const api = new Api({
  baseUrl: process.env.REACT_APP_API_BASEURL,
});

export default api;
