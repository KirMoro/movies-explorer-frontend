import './Profile.css';
import {Link} from "react-router-dom";

export const Profile = () => {
    return (
        <section className="profile">
            <form name="profile__form" className="profile__form">
                <h2 className="profile__form_title">Привет, Виталий!</h2>
                <fieldset className="profile__form_fieldset">
                    <label className="profile__form_label">
                        <span className="profile__form_text">
                            Имя
                        </span>
                        <input className="profile__form_input"
                               value={'Виталий'}
                        />
                    </label>
                    <label className="profile__form_label">
                        <span className="profile__form_text">
                            E-mail
                        </span>
                        <input className="profile__form_input"
                               value={'pochta@yandex.ru'}
                        />
                    </label>

                </fieldset>
                <button
                    type="submit"
                    // onClick={onSubmit}
                    className="profile__form_button"
                    // aria-label={ariaLabel}
                >
                    Редактировать
                </button>
                <Link
                    to="/"
                    className="profile__form_link"
                >
                    Выйти из аккаунта
                </Link>
            </form>
        </section>
    );
};

