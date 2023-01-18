import './Register.css';
import {Link} from "react-router-dom";

export const Register = () => {
    return (
        <section className="register">
            <div
                className="logo"
                aria-label="Главная страница"
            />
            <form name="register__form" className="register__form">
                <h2 className="register__form_title">Добро пожаловать!</h2>
                <fieldset className="register__form_fieldset">
                    <label className="register__form_label">
                        <span className="register__form_text">
                            Имя
                        </span>
                        <input className="register__form_input"
                               value={'Виталий'}
                        />
                    </label>
                    <label className="register__form_label">
                        <span className="register__form_text">
                            E-mail
                        </span>
                        <input className="register__form_input"
                               value={'pochta@yandex.ru'}
                        />
                    </label>
                    <label className="register__form_label">
                        <span className="register__form_text">
                            Пароль
                        </span>
                        <input className="register__form_input"
                               value={'pochta@yandex.ru'}
                        />
                    </label>

                </fieldset>
                <button
                    type="submit"
                    // onClick={onSubmit}
                    className="register__form_button"
                    // aria-label={ariaLabel}
                >
                    Редактировать
                </button>
                <p className="register__form_link_text">
                    Уже зарегистрированы?
                    <Link
                        to="/"
                        className="register__form_link"
                    >
                        Войти
                    </Link>
                </p>
            </form>
        </section>
    );
};

