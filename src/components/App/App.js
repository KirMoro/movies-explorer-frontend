import './App.css';
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {useEffect, useState} from 'react';
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
import {apiAuth} from "../../utils/apiAuth";
import {apiMovies} from "../../utils/MoviesApi";
import {apiMain} from "../../utils/MainApi";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoaded, setLoaded] = useState(false);
  const [searchRequest, setSearchRequest] = useState({});

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
  const handleSearch = searchData => {
      if (!isLoaded) {
          setLoaded(!isLoaded);
      }
      const shortDuration = 40;

      localStorage.setItem('searchRequest', JSON.stringify(searchData));

      const localMovies = JSON.parse(localStorage.getItem('movies'));

      if (localMovies) {
          const filteredMovies = localMovies.filter((movie) => {
              return movie.nameRU.toLowerCase().trim().includes(searchData.request.toLowerCase().trim())
          })

          localStorage.setItem('searchMovies', JSON.stringify(filteredMovies));
          setMovies(filteredMovies);
      }

      if (searchData.switch) {
          const shortMovies = localMovies.filter((movie) => movie.duration <= shortDuration);

          localStorage.setItem('searchMovies', JSON.stringify(shortMovies));
          setMovies(shortMovies);
      }

      // if (localMovies) {
      //     const filteredMovies = localMovies.filter((movie) => {
      //         return movie.nameRU.toLowerCase().trim().includes(searchData.request.toLowerCase().trim())
      //     })
      //
      //     if (searchData.switch) {
      //         const shortMovies = localMovies.filter((movie) => movie.duration <= shortDuration);
      //
      //         localStorage.setItem('searchMovies', JSON.stringify(shortMovies));
      //         setMovies(shortMovies);
      //     }
      //
      //     localStorage.setItem('searchMovies', JSON.stringify(filteredMovies));
      //     setMovies(filteredMovies);
      // }
  }

  // Сохранение фильма
    const handleSaveMovie = movie => {
      if (!movie.isSaved) {
          const saveMovie = {
              "country": movie.country,
              "director": movie.director,
              "duration": movie.duration,
              "year": movie.year,
              "description": movie.description,
              "image": `https://api.nomoreparties.co${movie.image.url}`,
              "trailerLink": movie.trailerLink,
              "thumbnail": `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
              "movieId": movie.id,
              "nameRU": movie.nameRU,
              "nameEN": movie.nameEN,
          }

          apiMain.saveMovie(saveMovie)
              .then((saveMovie) => {
                  console.log(saveMovie)

                  saveMovie.id = movie.id;
                  saveMovie.isSaved = true;
                  setMovies((state) => state.map((m) => (m.id === movie.id ? saveMovie : m)));
              })
              .catch((err) => {
                  console.log(err);
              });
      } else {
          apiMain.deleteMovie(movie._id)
              .then((deleteMovie) => {
                  deleteMovie.id = movie.id;
                  deleteMovie.isSaved = false;
                  setMovies((state) => state.map((m) => (m.id === movie.id ? deleteMovie : m)));
              })
              .catch((err) => {
                  console.log(err);
              });
      }
    }

  // Регистрация пользователя
  const handleRegistration = registrationData => {
    apiAuth.register(registrationData)
        .then(() => {
          history.push('/signin');
        }).catch((err) => {
          console.log(err)
    });
  }

  // Авторизация пользователя
  const handleLogin = loginData => {
    apiAuth.login(loginData)
        .then((data) => {
          // setLogin(!loggedIn);
          localStorage.setItem('token', data.token);
          apiMain.getToken(data.token);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
  }

    // Авторизация пользователя
    const handleChangeProfile = profileData => {
        apiMain.setProfile(profileData)
            .then((data) => {
                setCurrentUser(profile);
                history.push('/movies');
            })
            .catch((err) => {
                console.log(err);
            });
    }

  // Проверка токена авторизации
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
        apiMain.getToken(token);
        apiMain.getTokenValid(token)
          .then((data) => {
            setLogin(!loggedIn);
            history.push('/movies');
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

    useEffect(() => {
        tokenCheck();

        // if (localStorage.getItem("searchRequest")) {
        //     setLoaded(!isLoaded)
        // }
    }, []);

    // Загрузка данных с сервера
    useEffect( () => {
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
                    }

                    movies.forEach((movie) => {
                        savedMovies.forEach((savedMovie) => {
                            if (movie.nameRU === savedMovie.nameRU) {
                                movie._id = savedMovie._id;
                                movie.isSaved = true;
                            }
                        });
                    })

                    localStorage.setItem('movies', JSON.stringify(markIdAndIsSaved(movies)));

                    const savedPrevMovies = JSON.parse(localStorage.getItem('searchMovies'));
                    const savedPrevRequest = JSON.parse(localStorage.getItem('searchRequest'));

                    if (savedPrevMovies) {
                        setLoaded(!isLoaded);
                        setMovies(markIdAndIsSaved(savedPrevMovies));
                        setSearchRequest(savedPrevRequest);
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
                      {/*<ProtectedRoute*/}
                      {/*    path="/"*/}
                      {/*    component={Main}*/}
                      {/*    onEditProfile={handleEditProfileClick}*/}
                      {/*    onAddPlace={handleAddPlaceClick}*/}
                      {/*    onEditAvatar={handleEditAvatarClick}*/}
                      {/*    onCardClick={handleCardClick}*/}
                      {/*    cards={cards}*/}
                      {/*    onCardLike={handleCardLike}*/}
                      {/*    onCardDelete={handleDeleteCardId}*/}
                      {/*    onTrashClick={handleConfirmClick}*/}
                      {/*/>*/}
                      <Route path="/movies">
                          <Movies
                          isLoaded={isLoaded}
                          onSearch={handleSearch}
                          movies={movies}
                          searchRequest={searchRequest}
                          handleSaveMovies={handleSaveMovie}
                          />
                      </Route>
                      <Route path="/saved-movies">
                          <SavedMovies
                              onSearch={handleSearch}
                              movies={movies}
                              setSearchRequest={setSearchRequest}
                              handleSaveMovies={handleSaveMovie}
                          />
                      </Route>
                      <Route path="/profile">
                          <Profile
                          onSave={handleChangeProfile}
                          />
                      </Route>
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
