import './Navigation.css';

export const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__link">Регистрация</li>
                <button className="button">
                    Войти
                </button>

            </ul>
        </nav>
    );
};

