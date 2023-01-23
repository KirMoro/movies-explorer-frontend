import './Login.css';
import {Link} from "react-router-dom";
import {useState} from "react";

export const Login = ({ onLogin }) => {
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
        onLogin(values);
    }
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
            <form
                name="login__form"
                className="login__form"
                onSubmit={handleSubmit}
            >
                <h2 className="login__form-title">Рады видеть!</h2>
                <fieldset className="login__form-fieldset">
                    <label className="login__form-label">
                        <span className="login__form-text">
                            E-mail
                        </span>
                        <input className="login__form-input"
                               id="email-input"
                               type="email"
                               name="email"
                               placeholder="Email"
                               required
                               onChange={handleChange}
                        />
                    </label>
                    <label className="login__form-label">
                        <span className="login__form-text">
                            Пароль
                        </span>
                        <input
                            id="password-input"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            required
                            onChange={handleChange}
                            className="login__form-input"
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

