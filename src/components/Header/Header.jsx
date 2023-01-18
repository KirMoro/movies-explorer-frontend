import './Header.css';
import classNames from 'classnames';
import {Link} from "react-router-dom";

export const Header = ({children}) => {
    return (
        <header className={classNames('header')}>
            <Link
                to="/"
                >
                <div
                    className="logo"
                    aria-label="Главная страница"
                />
            </Link>
            {children}
        </header>
    );
};
