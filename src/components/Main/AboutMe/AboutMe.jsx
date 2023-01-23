import './AboutMe.css';

export const AboutMe = () => {
    return (
        <article className="article about-me">
            <div className="article__header">
                <h2 className="article__title">Студент</h2>
            </div>
            <section className="about-me__main">
                <div className="about-me__text-block">
                    <h2 className="about-me__title">Виталий</h2>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть
                        жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
                        компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
                        фриланс-заказами и ушёл с постоянной работы.</p>
                    <p className="about-me__link">Github</p>
                </div>
                <div className="about-me__photo"></div>
            </section>
        </article>
    );
};

