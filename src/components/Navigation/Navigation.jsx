import './Navigation.css';
import {NavLink, useLocation} from "react-router-dom";

export const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="navigation">
            {location.pathname === '/' && (
                <>
                    <ul className="navigation__list">
                        <li className="navigation__link">Регистрация</li>
                    </ul>
                    <button className="button button_color_blue">
                        Войти
                    </button>
                </>
            )}
            {(location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') && (
                <ul className="navigation__list">
                    <li className="navigation__link">Фильмы</li>
                    <li className="navigation__link">Сохранённые фильмы</li>
                    <li className="navigation__link">
                        <button className="button button_color_white">
                            Аккаунт
                            <span className="button__icon"></span>
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
};
