import './SearchForm.css';
import {useEffect, useState} from "react";
import {useFormValidation} from "../../hooks/useFormValidation";
import {useLocation} from "react-router-dom";

export const SearchForm = ({onSearch}) => {
    const location = useLocation();

    const [form, setForm] = useState({
        request: "",
    });
    const [switchState, setSwitchState] = useState(false);

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
            switch: switchState,
        }
        onSearch(searchData);
    }

    useEffect(() => {
        if (location.pathname === '/movies') {
            const searchRequest = JSON.parse(localStorage.getItem('searchRequest'));

            if (searchRequest) {
                setSwitchState(searchRequest.switch);
                setForm({
                    request: searchRequest.request,
                });
            }
        }
    }, []);

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
                            value={form.request || ''}
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
                        checked={switchState}
                        onChange={() => setSwitchState(!switchState)}
                        className="search__form-switch"
                        type="checkbox"
                    />
                </fieldset>
            </form>

        </article>
    );
};

