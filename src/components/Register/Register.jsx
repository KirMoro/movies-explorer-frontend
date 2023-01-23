import './Register.css';
import {Link} from "react-router-dom";
import {useState} from "react";

export const Register = ({ onRegister }) => {
    const [values, setValues] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(values)
        onRegister(values);
    }

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
            <form
                name="register__form"
                onSubmit={handleSubmit}
                className="register__form">
                <h2 className="register__form-title">Добро пожаловать!</h2>
                <fieldset className="register__form-fieldset">
                    <label className="register__form-label">
                        <span className="register__form-text">
                            Имя
                        </span>
                        <input
                            id="name-input"
                            type="name"
                            name="name"
                            placeholder="Имя"
                            minLength="2"
                            maxLength="30"
                            required
                            onChange={handleChange}
                            className="register__form-input"
                        />
                    </label>
                    <label className="register__form-label">
                        <span className="register__form-text">
                            E-mail
                        </span>
                        <input
                            id="email-input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                            className="register__form-input"
                        />
                    </label>
                    <label className="register__form-label">
                        <span className="register__form-text">
                            Пароль
                        </span>
                        <input
                            id="password-input"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            required
                            onChange={handleChange}
                            className="register__form-input"
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

