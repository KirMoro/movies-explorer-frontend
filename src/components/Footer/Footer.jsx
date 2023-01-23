import './Footer.css';

export const Footer = () => {
    return (
        <article className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__main">
                <p className="footer__year">© 2020</p>
                <ul className="footer__links">
                    <li>
                        <a className="footer__link">Яндекс.Практикум</a>
                    </li>
                    <li>
                        <a className="footer__link">Github</a>
                    </li>
                </ul>
            </div>
        </article>
    );
};

