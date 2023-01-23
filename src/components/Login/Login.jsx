import './Login.css';
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <section className="login">
            <Link
                to="/"
            >
                <div
                    className="logo"
                    aria-label="Главная страница"
                />
            </Link>
            <form name="login__form" className="login__form">
                <h2 className="login__form-title">Рады видеть!</h2>
                <fieldset className="login__form-fieldset">
                    <label className="login__form-label">
                        <span className="login__form-text">
                            Имя
                        </span>
                        <input className="login__form-input"
                               value={'Виталий'}
                        />
                    </label>
                    <label className="login__form-label">
                        <span className="login__form-text">
                            E-mail
                        </span>
                        <input className="login__form-input"
                               value={'pochta@yandex.ru'}
                        />
                    </label>
                </fieldset>
                <button
                    type="submit"
                    // onClick={onSubmit}
                    className="login__form-button"
                    // aria-label={ariaLabel}
                >
                    Войти
                </button>
                <p className="login__form-link-text">
                    Ещё не зарегистрированы?
                    <Link
                        to="/signup"
                        className="login__form-link"
                    >
                        Регистрация
                    </Link>
                </p>
            </form>
        </section>
    );
};

