import './NotFound.css';
import {Link, useHistory} from "react-router-dom";

export const NotFound = () => {
    const history = useHistory();

    return (
        <section className="notfound">
           <h2 className="notfound__title">404</h2>
            <p className="notfound__subtitle">Страница не найдена</p>
            <button
                onClick={() => {history.goBack()}}
                className="notfound__button">Назад</button>
        </section>
    );
};

