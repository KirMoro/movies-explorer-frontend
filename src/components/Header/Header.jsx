import './Header.css';
import classNames from 'classnames';

export const Header = ({children}) => {
    return (
        <header className={classNames('header')}>
            <div
                className="logo"
                aria-label="Главная страница"
            />
            {children}
        </header>
    );
};
