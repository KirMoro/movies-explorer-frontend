class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._content_type = 'application/json';
    this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}/${link}`, {
      method,
      headers: {
        'content-type': this._content_type,
      },
      body: JSON.stringify({ name: body.name, email: body.email, password: body.password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => result);
  }

  register(body) {
    return this._fetch('signup', 'POST', body);
  }

  login(body) {
    return this._fetch('signin', 'POST', body);
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: 'https://api.moviesapp.nomoredomains.club',
});
