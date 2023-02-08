import './Header.css';
import {Link} from "react-router-dom";

export const Header = ({children}) => {

    return (
        <header className='header'>
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
