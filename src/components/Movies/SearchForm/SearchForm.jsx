import './SearchForm.css';
import {useState} from "react";
import {useFormValidation} from "../../hooks/useFormValidation";

export const SearchForm = ({onSearch, searchRequest}) => {
    const [form, setForm] = useState({
        request: "",
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
        const searchData = {
            request: form.request,
            switchState: '',
        }
        onSearch(searchData);
    }

    return (
        <article className="search">
            <form
                onSubmit={handleSubmit}
                className="search__form">
                <fieldset className="search__form-fieldset search__form-fieldset_type_input">
                    <label>
                        <input
                            required
                            name="request"
                            placeholder="Фильм"
                            onChange={handleChange}
                            onBlur={onBlurField}
                            className="search__form-input"/>
                        {errors.request.dirty && errors.request.error ? (
                            <p className="search__form-error">{errors.request.message}</p>
                        ) : null}
                        <button className="search__form-button"
                                type="submit"
                                aria-label="Поиск"
                        ></button>
                    </label>

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

