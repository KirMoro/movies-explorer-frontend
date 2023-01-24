import './Register.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import {useFormValidation} from "../hooks/useFormValidation";

export const Register = ({onRegister}) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {errors, validateForm, onBlurField} = useFormValidation(form);

    const handleChange = e => {
        const {name, value} = e.target;
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
        onRegister(form);
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
                            required
                            onChange={handleChange}
                            onBlur={onBlurField}
                            className="register__form-input"
                        />
                        {errors.name.dirty && errors.name.error ? (
                            <p className="login__form-error">{errors.name.message}</p>
                        ) : null}
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
                            onBlur={onBlurField}
                            className="register__form-input"
                        />
                        {errors.email.dirty && errors.email.error ? (
                            <p className="login__form-error">{errors.email.message}</p>
                        ) : null}
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
                            onBlur={onBlurField}
                            className="register__form-input"
                        />
                        {errors.password.dirty && errors.password.error ? (
                            <p className="login__form-error">{errors.password.message}</p>
                        ) : null}
                    </label>
                </fieldset>
                {(!form.name || !form.email || !form.password || errors.password.dirty && errors.password.error || errors.email.dirty && errors.email.error || errors.name.dirty && errors.name.error) ? (
                    <button
                        type="submit"
                        className="register__form-button"
                        aria-label="submit-button"
                        disabled={true}
                    >
                        Редактировать
                    </button>
                ) : <button
                    type="submit"
                    className="register__form-button"
                    aria-label="submit-button"
                >
                    Редактировать
                </button>}
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

