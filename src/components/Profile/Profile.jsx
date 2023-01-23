import './Profile.css';
import {Link} from "react-router-dom";

export const Profile = () => {
    return (
        <section className="profile">
            <form name="profile__form" className="profile__form">
                <h2 className="profile__form-title">Привет, Виталий!</h2>
                <fieldset className="profile__form-fieldset">
                    <label className="profile__form-label">
                        <span className="profile__form-text">
                            Имя
                        </span>
                        <input className="profile__form-input"
                               value={'Виталий'}
                        />
                    </label>
                    <label className="profile__form-label">
                        <span className="profile__form-text">
                            E-mail
                        </span>
                        <input className="profile__form-input"
                               value={'pochta@yandex.ru'}
                        />
                    </label>

                </fieldset>
                <button
                    type="submit"
                    // onClick={onSubmit}
                    className="profile__form-button"
                    // aria-label={ariaLabel}
                >
                    Редактировать
                </button>
                <Link
                    to="/"
                    className="profile__form-link"
                >
                    Выйти из аккаунта
                </Link>
            </form>
        </section>
    );
};

