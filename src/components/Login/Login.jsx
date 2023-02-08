import './Login.css';
import {Link, Redirect} from "react-router-dom";
import {useContext, useState} from "react";
import {useFormValidation} from "../hooks/useFormValidation";
import {AppContext} from "../../contexts/AppContext";

export const Login = ({ onLogin }) => {
    const value = useContext(AppContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const { errors, validateForm, onBlurField } = useFormValidation(form);

    const handleChange = e => {
        const { name, value } = e.target;
        const nextFormState = {
            ...form,
            [name]: value,
        };

        setForm(nextFormState);
        if (errors[name].dirty)
            validateForm({
                form: nextFormState,
                errors,
                name,
            });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onLogin(form);
    }

    return (!value.loggedIn ?  <section className="login">
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
                                   onBlur={onBlurField}
                            />
                            {errors.email.dirty && errors.email.error ? (
                                <p className="login__form-error">{errors.email.message}</p>
                            ) : null}
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
                                onBlur={onBlurField}
                                className="login__form-input"
                            />
                            {errors.password.dirty && errors.password.error ? (
                                <p className="login__form-error">{errors.password.message}</p>
                            ) : null}
                        </label>
                    </fieldset>
                    {(!form.email || !form.password || errors.password.dirty && errors.password.error || errors.email.dirty && errors.email.error) ? (
                        <button
                            type="submit"
                            className="login__form-button"
                            aria-label="submit-button"
                            disabled={true}
                        >
                            Войти
                        </button>
                    ) : <button
                        type="submit"
                        className="login__form-button"
                        aria-label="submit-button"
                    >
                        Войти
                    </button>}
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
            </section> : <Redirect to="/movies" />
    );
};

