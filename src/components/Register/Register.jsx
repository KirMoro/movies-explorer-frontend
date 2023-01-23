import './Register.css';
import {Link} from "react-router-dom";

export const Register = () => {
    return (
        <section className="register">
            <Link
                to="/"
            >
                <div
                    className="logo"
                    aria-label="Главная страница"
                />
            </Link>
            <form name="register__form" className="register__form">
                <h2 className="register__form-title">Добро пожаловать!</h2>
                <fieldset className="register__form-fieldset">
                    <label className="register__form-label">
                        <span className="register__form-text">
                            Имя
                        </span>
                        <input className="register__form-input"
                               value={'Виталий'}
                        />
                    </label>
                    <label className="register__form-label">
                        <span className="register__form-text">
                            E-mail
                        </span>
                        <input className="register__form-input"
                               value={'pochta@yandex.ru'}
                        />
                    </label>
                    <label className="register__form-label">
                        <span className="register__form-text">
                            Пароль
                        </span>
                        <input className="register__form-input"
                               value={'pochta@yandex.ru'}
                        />
                    </label>

                </fieldset>
                <button
                    type="submit"
                    // onClick={onSubmit}
                    className="register__form-button"
                    // aria-label={ariaLabel}
                >
                    Редактировать
                </button>
                <p className="register__form-link-text">
                    Уже зарегистрированы?
                    <Link
                        to="/signin"
                        className="register__form-link"
                    >
                        Войти
                    </Link>
                </p>
            </form>
        </section>
    );
};

