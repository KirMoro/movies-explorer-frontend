class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._content_type = 'application/json';
    this._token = options.token;
    this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}/${link}`, {
      method,
      headers: {
        authorization: `Bearer ${this._token}`,
        'content-type': this._content_type,
      },
      body: (body && JSON.stringify(body)),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => result);
  }

  getToken(token) {
    this._token = token;
  }

  getTokenValid(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'content-type': this._content_type,
        Authorization: `Bearer ${token}`,
      },
      body: undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
      .then((result) => result);
  }

  getProfileInfo() {
    return this._fetch('users/me');
  }

  setProfile(body) {
    return this._fetch('users/me', 'POST', body);
  }

  saveMovie(body) {
    return this._fetch('movies/', 'POST', body);
  }

  deleteMovie(id) {
    return this._fetch(`movies/${id}`, 'DELETE');
  }

  getSavedMovies() {
    return this._fetch('movies');
  }
}

export const apiMain = new MainApi({
  baseUrl: 'https://api.moviesapp.nomoredomains.club',
  token: '',
});
