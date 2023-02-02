import './App.css';
import {
  Route, Switch, useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { NotFound } from '../NotFound/NotFound';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Menu } from '../Menu/Menu';
import { apiAuth } from '../../utils/apiAuth';
import { apiMovies } from '../../utils/MoviesApi';
import { apiMain } from '../../utils/MainApi';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { constants } from '../../utils/constants';

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [searchSaveError, setSearchSaveError] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const closeAllPopups = () => {
    setMenuOpen(false);
  };

  const pathsWithoutHeaderArr = [
    '/signup',
    '/signin',
  ];

  const pathsWithoutFooterArr = [
    '/profile',
    '/signup',
    '/signin',
  ];

  // Обработка поискового запроса
  const handleSearch = (searchData) => {
    setLoaded(true);
    setMovies([])

    if (searchError) {
      setSearchError(!searchError);
    }

    const markIdAndIsSaved = (movies, savedMovies) => {
      movies.forEach((movie) => {
        savedMovies.forEach((savedMovie) => {
          if (movie.nameRU === savedMovie.nameRU) {
            movie._id = savedMovie._id;
            movie.isSaved = true;
          }
        });
      });
      return movies;
    };

    const setSearchMovie = () => {
      localStorage.setItem('searchRequest', JSON.stringify(searchData));

      apiMovies.getMovies()
          .then((movies) => {
            const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
            const markedMovies = markIdAndIsSaved(movies, savedMovies);
            const filteredMovies = markedMovies
                .filter((movie) => movie.nameRU
                    .toLowerCase()
                    .trim()
                    .includes(searchData.request.toLowerCase().trim()));

            if (filteredMovies.length > 0) {
              localStorage.setItem('searchMovies', JSON.stringify(filteredMovies));
              // localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
              setMovies(filteredMovies);
            } else {
              setSearchError(!searchError);
            }

            if (searchData.switch) {
              const shortMovies = filteredMovies.filter((movie) => movie.duration <= constants.SHORT_MOVIES_DURATION);

              if (shortMovies.length > 0) {
                localStorage.setItem('searchMovies', JSON.stringify(shortMovies));
                // localStorage.setItem('savedMovies', JSON.stringify(shortMovies));
                setMovies(shortMovies);
              } else {
                setSearchError(!searchError);
              }
            }
          })
      setLoaded(false);
          }

    setTimeout(setSearchMovie, 500);
  };

  // Обработка поискового запроса по сохранненым фильмам
  const handleSavedMoviesSearch = (searchData) => {
    setLoaded(true);

    if (searchSaveError) {
      setSearchSaveError(false);
    }

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

    const filteredMovies = savedMovies
        .filter((movie) => movie.nameRU
            .toLowerCase()
            .trim()
            .includes(searchData.request.toLowerCase().trim()));

        if (filteredMovies.length !== 0) {
          setSavedMovies(filteredMovies);
        } else {
          setSearchSaveError(true);
        }

        if (searchData.switch) {
          const shortMovies = filteredMovies.filter((movie) => movie.duration <= constants.SHORT_MOVIES_DURATION);

          if (shortMovies.length !== 0) {
            setSavedMovies(filteredMovies);
          } else {
            setSearchSaveError(true);
          }
        }
    setLoaded(false);
  };

  // Сохранение фильма
  const handleSaveMovie = (movie) => {
    if (!movie.isSaved) {
      const savedMovie = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };

      apiMain.saveMovie(savedMovie)
        .then((saveMovie) => {
          saveMovie.isSaved = true;
          setMovies((state) => state.map((m) => {
            if (m.nameRU === movie.nameRU) {
              m.isSaved = true;
              m._id = saveMovie._id;
            }
            return m;
          }));
          localStorage.setItem('searchMovies', JSON.stringify(movies));
          setSavedMovies([...savedMovies, saveMovie]);
          // localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiMain.deleteMovie(movie._id)
        .then((deleteMovie) => {
          setMovies((state) => state.map((m) => {
            if (m.nameRU === deleteMovie.nameRU) {
              m.isSaved = false;
              m._id = deleteMovie._id;
            }
            return m
          }));
          localStorage.setItem('searchMovies', JSON.stringify(movies));
          setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Регистрация пользователя
  const handleRegistration = (registrationData) => {
    apiAuth.register(registrationData)
      .then(() => {
        handleLogin({
          email: registrationData.email,
          password: registrationData.password,
        })
      }).catch((err) => {
        console.log(err);
      });
  };

  // Авторизация пользователя
  const handleLogin = (loginData) => {
    apiAuth.login(loginData)
      .then((data) => {
        localStorage.setItem('token', data.token);
        apiMain.getToken(data.token);
        setLogin(true);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Авторизация пользователя
  const handleChangeProfile = (profileData, updateCallBack) => {
    apiMain.setProfile(profileData)
      .then((data) => {
        setCurrentUser(data);
        updateCallBack(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Проверка токена авторизации
  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token && location.pathname !== '/*') {
      apiMain.getToken(token);
      apiMain.getTokenValid(token)
        .then((data) => {
          console.log(data)
          setLogin(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Выход из программы
  const signOut = () => {
    setLogin(false);
    localStorage.clear();
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    history.push('/');
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  // Загрузка данных с сервера
  useEffect(() => {
    if (loggedIn) {

      const initialPromises = Promise.all([
        apiMain.getProfileInfo(),
        apiMain.getSavedMovies(),
      ]);
      initialPromises
        .then(([profile, savedMovies]) => {
          setCurrentUser(profile);

          if (savedMovies) {
            savedMovies.forEach((movie) => {
              movie.isSaved = true;
            });
          }

          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
          setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));

          const markIdAndIsSaved = (prevReqMovies) => {
            prevReqMovies.forEach((movie) => {
              savedMovies.forEach((savedMovie) => {
                if (movie.nameRU === savedMovie.nameRU) {
                  movie._id = savedMovie._id;
                  movie.isSaved = true;
                }
              });
            });
            return prevReqMovies;
          };

          const savedPrevMovies = JSON.parse(localStorage.getItem('searchMovies'));
          if (savedPrevMovies) {
            setMovies(savedPrevMovies);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <AppContext.Provider value={{ loggedIn, setLogin }}>
      <CurrentUserContext.Provider value={currentUser}>
        <>
          {useRouteMatch(pathsWithoutHeaderArr) ? null : (
            <Header>
              <Navigation
                onOpenMenu={setMenuOpen}
              />
            </Header>
          )}
          <Switch>
            <Route path="/signup">
              <Register
                onRegister={handleRegistration}
              />
            </Route>
            <Route path="/signin">
              <Login
                onLogin={handleLogin}
              />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              isLoaded={isLoaded}
              onSearch={handleSearch}
              movies={movies}
              handleSaveMovies={handleSaveMovie}
              searchError={searchError}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              onSearch={handleSavedMoviesSearch}
              movies={savedMovies}
              handleSaveMovies={handleSaveMovie}
              searchSaveError={searchSaveError}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              onSave={handleChangeProfile}
              onSignOut={signOut}
            />
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          {useRouteMatch(pathsWithoutFooterArr) ? null : (<Footer />)}
          <Menu
            isOpen={isMenuOpen}
            onClose={closeAllPopups}
          />
        </>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
