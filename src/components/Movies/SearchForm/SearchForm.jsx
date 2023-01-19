import './SearchForm.css';

export const SearchForm = ({children}) => {
    return (
        <article className="search">
            <form className="search__form">
                <fieldset className="search__form_fieldset search__form_fieldset_type_input">
                    <label></label>
                    <input className="search__form_input"/>
                    <button className="search__form-button"
                            type="submit"
                            aria-label="Поиск"
                    ></button>
                </fieldset>
                <fieldset className="search__form_fieldset search__form_fieldset_type_switch">
                    <label className="search__form_label">
                        Короткометражки
                    </label>
                    {/*<label className="search__form_switch"></label>*/}
                    <input
                        className="search__form_switch"
                        type="checkbox"
                    />
                </fieldset>
            </form>

        </article>
    );
};

