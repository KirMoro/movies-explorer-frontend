import './Navigation.css';
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

export const Navigation = ({onOpenMenu}) => {
    const location = useLocation();

    return (
        <nav className="navigation">
            {location.pathname === '/' && (
                <>
                    <ul className="navigation__list">
                        <li>
                            <Link to="/signup"
                                  className="navigation__link"
                            >
                                Регистрация
                            </Link>
                        </li>
                    </ul>
                    <Link
                        to="/signin"
                        className="button button_color_blue">
                        Войти
                    </Link>
                </>
            )}
            {(location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') && (
                <>
                    <ul className="navigation__list navigation__list_type_movies">
                        <li>
                            <Link to="/movies"
                                  className="navigation__link"
                            >
                                Фильмы
                            </Link>
                        </li>
                        <li>
                            <Link to="/saved-movies"
                                  className="navigation__link"
                            >
                                Сохранённые фильмы
                            </Link>
                        </li>
                        <Link
                            to="/profile"
                            className="button button_color_white">
                            Аккаунт
                            <span className="button__icon"></span>
                        </Link>
                    </ul>
                    <button
                        className="navigation__burger-button"
                        onClick={onOpenMenu}
                    >
                    </button>
                </>
            )}
        </nav>
    );
};
