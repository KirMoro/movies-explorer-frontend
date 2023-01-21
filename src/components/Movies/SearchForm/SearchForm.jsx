import './SearchForm.css';

export const SearchForm = ({children}) => {
    return (
        <article className="search">
            <form className="search__form">
                <fieldset className="search__form-fieldset search__form-fieldset_type_input">
                    <label></label>
                    <input
                        required
                        className="search__form-input"/>
                    <button className="search__form-button"
                            type="submit"
                            aria-label="Поиск"
                    ></button>
                </fieldset>
                <fieldset className="search__form-fieldset search__form-fieldset_type_switch">
                    <label className="search__form-label">
                        Короткометражки
                    </label>
                    <input
                        className="search__form-switch"
                        type="checkbox"
                    />
                </fieldset>
            </form>

        </article>
    );
};

