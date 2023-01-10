import './Header.css';
import classNames from 'classnames';

export const Header = ({children}) => {
    return (
        <header className={classNames('header')}>
            <div
                className="header__logo"
                aria-label="Главная страница"
            />
            {children}
        </header>
    );
};
