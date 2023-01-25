import './MoviesCard.css';
import classNames from "classnames";

export const MoviesCard = ({movie, onSave
                     }) => {

    const baseURL = 'https://api.nomoreparties.co/';
    let imageURL = '';
    if (movie.image.url) {
        imageURL = `${baseURL}${movie.image.url}`
    } else {
       imageURL = movie.image;
    }
    // movie.image.url ? imageURL = `${baseURL}${movie.image.url}`: imageURL = movie.image;

    const handleClick = () => {
        onSave(movie);
    }

    const convertMinutesToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}ч ${remainingMinutes}м`;
    }

    return (
        <li className="moviescard">
            <img className="moviescard__image" src={imageURL} alt={movie.nameRU} />
            <div className="moviescard__text">
                <h2 className="moviescard__title">{movie.nameRU}</h2>
                <p className="moviescard__duration">{convertMinutesToHours(movie.duration)}</p>
                <button
                    onClick={() => handleClick()}
                    type="button"
                    className={classNames("moviescard__like-button", { moviescard__likebutton_active: movie.isSaved })}
                    aria-label="Понравилось"
                />
            </div>
        </li>
    );
};
