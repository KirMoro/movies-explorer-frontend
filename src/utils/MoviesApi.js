class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._content_type = 'application/json';
        this._fetch = (link, method = 'GET', body = undefined) => fetch(`${this._baseUrl}`, {
            method: method,
            headers: {
                'content-type': this._content_type
            },
            body: JSON.stringify()
        })
            .then(res => {
                    if (res.ok) {
                        return res.json();

                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            )
            .then((result) => {
                return result;
            });
    }

    getMovies() {
        return this._fetch()
    }

    login(body) {
        return this._fetch('signin', 'POST', body)
    }

    getTokenValid(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'content-type': this._content_type,
                'Authorization': `Bearer ${token}`
            },
            body: undefined
        }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        )
            .then((result) => {
                return result;
            });
    }
}

export const apiMovies = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});
