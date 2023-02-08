class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._content_type = 'application/json';
    this._fetch = (link, method = 'GET') => fetch(`${this._baseUrl}`, {
      method,
      headers: {
        'content-type': this._content_type,
      },
      body: JSON.stringify(),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => result);
  }

  getMovies() {
    return this._fetch();
  }
}

export const apiMovies = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});
