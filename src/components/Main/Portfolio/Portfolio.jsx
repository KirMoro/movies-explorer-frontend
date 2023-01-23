import './Portfolio.css';

export const Portfolio = () => {
    return (
        <article className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li>
                    <a
                        href="https://github.com/KirMoro/how-to-learn"
                        target="_blank"
                        className="portfolio__link">Статичный сайт</a>
                </li>
                <li>
                    <a
                        href="https://github.com/KirMoro/russian-travel"
                        target="_blank"
                        className="portfolio__link">Адаптивный сайт</a>
                </li>
                <li>
                    <a
                        href="https://github.com/KirMoro/react-mesto-api-full"
                        target="_blank"
                        className="portfolio__link">Одностраничное приложение</a>
                </li>
            </ul>
        </article>
    );
};

