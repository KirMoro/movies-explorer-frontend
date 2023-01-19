import './Menu.css';
import {Navigation} from "../Navigation/Navigation";
import classNames from "classnames";
import {Link} from "react-router-dom";

export const Menu = ({isOpen, onClose}) => {
    return (
        <div className={classNames('menu', { menu_opened: isOpen })}>
            <div className="menu__container">
                <ul className="navigation__list navigation__list_type_popup">
                    <li>
                        <Link to="/"
                              className="navigation__link navigation__link_type_popup"
                        >
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link to="/movies"
                              className="navigation__link navigation__link_type_popup"
                        >
                            Фильмы
                        </Link>
                    </li>
                    <li>
                        <Link to="/saved-movies"
                              className="navigation__link navigation__link_type_popup"
                        >
                            Сохранённые фильмы
                        </Link>
                    </li>
                </ul>
                <Link
                    to="/profile"
                    className="button button_color_white button_color_white_type_popup">
                    Аккаунт
                    <span className="button__icon"></span>
                </Link>
                <button
                    type="button"
                    className="menu__close-button"
                    aria-label="Закрыть"
                    onClick={() => onClose(isOpen)}
                />
            </div>
        </div>
    );
};
