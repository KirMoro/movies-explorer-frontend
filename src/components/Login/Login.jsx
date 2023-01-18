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
                <h2 className="login__form_title">Рады видеть!</h2>
                <fieldset className="login__form_fieldset">
                    <label className="login__form_label">
                        <span className="login__form_text">
                            Имя
                        </span>
                        <input className="login__form_input"
                               value={'Виталий'}
                        />
                    </label>
                    <label className="login__form_label">
                        <span className="login__form_text">
                            E-mail
                        </span>
                        <input className="login__form_input"
                               value={'pochta@yandex.ru'}
                        />
                    </label>
                </fieldset>
                <button
                    type="submit"
                    // onClick={onSubmit}
                    className="login__form_button"
                    // aria-label={ariaLabel}
                >
                    Войти
                </button>
                <p className="login__form_link_text">
                    Ещё не зарегистрированы?
                    <Link
                        to="/signup"
                        className="login__form_link"
                    >
                        Регистрация
                    </Link>
                </p>
            </form>
        </section>
    );
};

