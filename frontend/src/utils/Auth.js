class Auth {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
    this._call = this._call.bind(this);
  }

  _call(method, endpoint, body, headers) {
    const requestData = {
      method: method,
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
    if (body) {
      requestData.body = JSON.stringify(body);
    }
    if (headers) {
      Object.assign(requestData["headers"], headers);
    }
    return fetch(`${this._baseUrl}/${endpoint}`, requestData)
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        }
      );
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

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co' 
});

export default auth;
