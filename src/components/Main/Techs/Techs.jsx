import './Techs.css';

export const Techs = () => {
    return (
        <article className="techs">
            <div className="article__header">
                <h2 className="article__title">Технологии</h2>
            </div>
            <section className="techs__main">
                <h1 className="techs__title">7 технологий</h1>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__navigation">
                    <li>
                        <button className="button button_color_gray techs__button">
                            HTML
                        </button>
                    </li>
                    <li>
                        <button className="button button_color_gray techs__button">
                            CSS
                        </button>
                    </li>
                    <li>
                        <button className="button button_color_gray techs__button">
                            JS
                        </button>
                    </li>
                    <li>
                        <button className="button button_color_gray techs__button">
                            React
                        </button>
                    </li>
                    <li>
                        <button className="button button_color_gray techs__button">
                            Git
                        </button>
                    </li>
                    <li>
                        <button className="button button_color_gray techs__button">
                            Express.js
                        </button>
                    </li>
                    <li>
                        <button className="button button_color_gray techs__button">
                            mongoDB
                        </button>
                    </li>
                </ul>
            </section>
        </article>
    );
};

