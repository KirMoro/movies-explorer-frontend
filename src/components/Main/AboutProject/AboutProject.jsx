import './AboutProject.css';

export const AboutProject = () => {
    return (
        <article className="article about-project">
            <div className="article__header">
                <h2 className="article__title">О проекте</h2>
            </div>
            <section className="two-columns">
                <div className="two-columns__column">
                    <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.</p>
                </div>
                <div className="two-columns__column">
                    <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.</p>
                </div>
            </section>
            <section className="about-project__progress-bar">
                <div className="about-project__progress-bar-column about-project__progress-bar-column_color_blue">
                    <p className="about-project__progress-bar-text about-project__progress-bar-text_color_white">1
                        неделя</p>
                </div>
                <div className="about-project__progress-bar-column about-project__progress-bar-column_color_gray">
                    <p className="about-project__progress-bar-text about-project__progress-bar-text_color_black">4
                        недели</p>
                </div>
                <div className="about-project__progress-bar-column about-project__progress-bar-column_type_backend">
                    <p className="about-project__progress-bar-text">Back-end</p>
                </div>
                <div className="about-project__progress-bar-column about-project__progress-bar-column_type_frontend">
                    <p className="about-project__progress-bar-subtext ">Front-end</p>
                </div>
            </section>
        </article>
    );
};

