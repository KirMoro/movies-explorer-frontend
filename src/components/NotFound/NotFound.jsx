import './NotFound.css';
import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <section className="notfound">
           <h2 className="notfound__title">404</h2>
            <p className="notfound__subtitle">Страница не найдена</p>
            <Link className="notfound__link">Назад</Link>
        </section>
    );
};

