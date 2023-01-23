import './App.css';
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';
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

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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

  // Регистрация пользователя
  function handleRegistration(registrationData) {
    apiAuth.register(registrationData)
        .then(() => {
          history.push('/signin');
        }).catch((err) => {
          console.log(err)
    });
  }

  // Авторизация пользователя
  function handleLogin(loginData) {
    apiAuth.login(loginData)
        .then((token) => {
          setLogin(!loggedIn);
          localStorage.setItem('token', token);
          // api.getToken(data.token);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
  }

  // console.log(apiMovies.getMovies())

  // Проверка токена авторизации
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      api.getToken(token);
      apiAuth.getTokenValid(token)
          .then((data) => {
            setLogin(!loggedIn);
            setUserEmail(data.email);
            history.push('/');
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }

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
                      <Route path="/movies">
                          <Movies />
                      </Route>
                      <Route path="/saved-movies">
                          <SavedMovies />
                      </Route>
                      <Route path="/profile">
                          <Profile />
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
