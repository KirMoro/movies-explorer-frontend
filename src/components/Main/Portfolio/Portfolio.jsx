import './Portfolio.css';

export const Portfolio = () => {
    return (
        <article className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li>
                    <a className="portfolio__link">Статичный сайт</a>
                </li>
                <li>
                    <a className="portfolio__link">Адаптивный сайт</a>
                </li>
                <li>
                    <a className="portfolio__link">Одностраничное приложение</a>
                </li>
            </ul>
        </article>
    );
};

