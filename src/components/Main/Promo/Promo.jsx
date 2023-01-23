import './Promo.css';

export const Promo = () => {
    return (
        <article className="promo">
            <section className="promo__main">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
                <ul className="promo__navigation">
                    <li>
                        <button className="button button_color_gray promo__button">
                            О проекте
                        </button>
                    </li>
                    <li>
                        <button className="button button_color_gray promo__button">
                            Технологии
                        </button>
                    </li>
                    <li>
                        <button className="button button_color_gray promo__button">
                            Студент
                        </button>
                    </li>
                </ul>
            </section>
        </article>
    );
};

