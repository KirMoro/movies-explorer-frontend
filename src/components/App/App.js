import './App.css';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
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

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

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

  return (
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
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
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
  );
}

export default App;
