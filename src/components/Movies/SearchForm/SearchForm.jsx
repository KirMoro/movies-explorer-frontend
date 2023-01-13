import './SearchForm.css';

export const SearchForm = ({children}) => {
    return (
        <article className="search">
            <form className="search__form">
                <fieldset className="search__form_fieldset">
                    <label></label>
                    <input className="search__form_input"/>
                    <button className="search__form-button"></button>
                </fieldset>
            </form>

        </article>
    );
};

