import './MoviesCard.css';
import { useContext } from 'react';

export const MoviesCard = ({movie,
                     }) => {

    const convertMinutesToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}ч ${remainingMinutes}м`;
    }

    return (
        <li className="moviescard">
            <img className="moviescard__image" src={movie.image} alt={movie.nameRU} />
            <div className="moviescard__text">
                <h2 className="moviescard__title">{movie.nameRU}</h2>
                <p className="moviescard__duration">{convertMinutesToHours(movie.duration)}</p>
                <button
                    type="button"
                    className="moviescard__like-button"
                    aria-label="Понравилось"
                />
            </div>
        </li>
    );
};
