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
import {constants} from "../../utils/constants";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchError, setSearchError] = useState(false);
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
    setLoaded(!isLoaded);

    if (searchError) {
      setSearchError(!searchError);
    }

    const fucn = () => {
      localStorage.setItem('searchRequest', JSON.stringify(searchData));

      const localMovies = JSON.parse(localStorage.getItem('movies'));

      if (localMovies) {
        const filteredMovies = localMovies
            .filter((movie) => movie.nameRU
                .toLowerCase()
                .trim()
                .includes(searchData.request.toLowerCase().trim()));

        if (filteredMovies.length > 0) {
          localStorage.setItem('searchMovies', JSON.stringify(filteredMovies));
          setMovies(filteredMovies);
        } else {
          setSearchError(!searchError);
        }

        if (searchData.switch) {
          const shortMovies = filteredMovies.filter((movie) => movie.duration <= constants.SHORT_MOVIES_DURATION);

          if (shortMovies.length > 0) {
            localStorage.setItem('searchMovies', JSON.stringify(shortMovies));
            setMovies(shortMovies);
          } else {
            setSearchError(!searchError);
          }
        }
      }
      setLoaded(false);
    }

    setTimeout(fucn, 500);
  };

  // Обработка поискового запроса по сохранненым фильмам
  const handleSavedMoviesSearch = (searchData) => {
    setLoaded(!isLoaded);

    if (searchError) {
      setSearchError(!searchError);
    }

    apiMain.getSavedMovies()
        .then((savedMovies) => {
          const filteredMovies = savedMovies
              .filter((movie) => movie.nameRU
                  .toLowerCase()
                  .trim()
                  .includes(searchData.request.toLowerCase().trim()));

          if (filteredMovies.length > 0) {
            setSavedMovies(filteredMovies);
          } else {
            setSearchError(!searchError);
          }

          if (searchData.switch) {
            const shortMovies = filteredMovies.filter((movie) => movie.duration <= constants.SHORT_MOVIES_DURATION);

            if (shortMovies.length > 0) {
              setSavedMovies(filteredMovies);
            } else {
              setSearchError(!searchError);
            }
          }
        })
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
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };

      apiMain.saveMovie(savedMovie)
        .then((saveMovie) => {
          saveMovie.isSaved = true;
          setMovies((state) => state.map((m) => (m.nameRU === movie.nameRU ? saveMovie : m)));
          setSavedMovies([...savedMovies, saveMovie]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiMain.deleteMovie(movie._id)
        .then((deleteMovie) => {
          deleteMovie.isSaved = false;
          setMovies((state) => state.map((m) => (m.nameRU === movie.nameRU ? deleteMovie : m)));
          setSavedMovies((state) => state.filter((m) => m.movieId !== movie.movieId));
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
        history.push('/movies');
      }).catch((err) => {
        console.log(err);
      });
  };

  // Авторизация пользователя
  const handleLogin = (loginData) => {
    apiAuth.login(loginData)
      .then((data) => {
        setLogin(!loggedIn);
        localStorage.setItem('token', data.token);
        apiMain.getToken(data.token);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Авторизация пользователя
  const handleChangeProfile = (profileData) => {
    apiMain.setProfile(profileData)
      .then((data) => {
        setCurrentUser(data);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Проверка токена авторизации
  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token && location.pathname !== "/*") {
        apiMain.getToken(token);
        apiMain.getTokenValid(token)
            .then((data) => {
              setLogin(!loggedIn);
              // history.push('/');
            })
            .catch((err) => {
              console.log(err);
            });
      }
  }

  // Выход из программы
  const signOut = () => {
    setLogin(!loggedIn);
    localStorage.clear();
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    history.push('/signup');
  };

  useEffect(() => {
      tokenCheck();
  }, []);

  // Загрузка данных с сервера
  useEffect(() => {
    if (loggedIn) {
      const initialPromises = Promise.all([
        apiMain.getProfileInfo(),
        apiMovies.getMovies(),
        apiMain.getSavedMovies(),
      ]);
      initialPromises
        .then(([profile, movies, savedMovies]) => {
          setCurrentUser(profile);

          if (savedMovies) {
            savedMovies.forEach((movie) => {
              movie.isSaved = true;
            });
          }
          setSavedMovies(savedMovies);

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

          movies.forEach((movie) => {
            savedMovies.forEach((savedMovie) => {
              if (movie.nameRU === savedMovie.nameRU) {
                movie._id = savedMovie._id;
                movie.isSaved = true;
              }
            });
          });

          localStorage.setItem('movies', JSON.stringify(markIdAndIsSaved(movies)));

          const savedPrevMovies = JSON.parse(localStorage.getItem('searchMovies'));

          if (savedPrevMovies) {
            setMovies(markIdAndIsSaved(savedPrevMovies));
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
              searchError={searchError}
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
