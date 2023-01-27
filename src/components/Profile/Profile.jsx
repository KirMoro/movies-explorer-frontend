import './Profile.css';
import {useContext, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useFormValidation} from "../hooks/useFormValidation";

export const Profile = ({onSave, onSignOut}) => {
    const currentUserContext = useContext(CurrentUserContext);

    const [form, setForm] = useState({
        name: currentUserContext.name,
        email: currentUserContext.email,
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
        onSave(form);
    }

    return (
        <section className="profile">
            <form
                onSubmit={handleSubmit}
                name="profile__form"
                className="profile__form">
                <h2 className="profile__form-title">Привет, {currentUserContext.name}!</h2>
                <fieldset className="profile__form-fieldset">
                    <label className="profile__form-label">
                        <span className="profile__form-text">
                            Имя
                        </span>
                        <input
                            id="name-input"
                            type="name"
                            name="name"
                            required
                            onChange={handleChange}
                            onBlur={onBlurField}
                            className="profile__form-input"
                            value={form.name || ''}
                        />
                        {errors.name.dirty && errors.name.error ? (
                            <p className="profile__form-error">{errors.name.message}</p>
                        ) : null}
                    </label>
                    <label className="profile__form-label">
                        <span className="profile__form-text">
                            E-mail
                        </span>
                        <input
                            id="email-input"
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                            onBlur={onBlurField}
                            className="profile__form-input"
                            value={form.email || ''}
                        />
                        {errors.email.dirty && errors.email.error ? (
                            <p className="profile__form-error">{errors.email.message}</p>
                        ) : null}
                    </label>
                </fieldset>
                {(form.email === currentUserContext.email && form.name === currentUserContext.name || errors.name.dirty && errors.name.error || errors.email.dirty && errors.email.error) ? (
                    <button
                        type="submit"
                        className="login__form-button"
                        aria-label="submit-button"
                        disabled={true}
                    >
                        Редактировать
                    </button>
                ) : <button
                    type="submit"
                    className="login__form-button"
                    aria-label="submit-button"
                >
                    Сохранить
                </button>}
                <button
                    onClick={onSignOut}
                    className="profile__form-link"
                >
                    Выйти из аккаунта
                </button>
            </form>
        </section>
    );
};

