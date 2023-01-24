import './Profile.css';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export const Profile = () => {
    const currentUserContext = useContext(CurrentUserContext);

    return (
        <section className="profile">
            <form name="profile__form" className="profile__form">
                <h2 className="profile__form-title">Привет, {currentUserContext.name}!</h2>
                <fieldset className="profile__form-fieldset">
                    <label className="profile__form-label">
                        <span className="profile__form-text">
                            Имя
                        </span>
                        <input className="profile__form-input"
                               value={currentUserContext.name}
                        />
                    </label>
                    <label className="profile__form-label">
                        <span className="profile__form-text">
                            E-mail
                        </span>
                        <input className="profile__form-input"
                               value={currentUserContext.email}
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

