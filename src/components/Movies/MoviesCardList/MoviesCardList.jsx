import './MoviesCardList.css';
import {MoviesCard} from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";

export const MoviesCardList = ({movies, onSave, onAddMore, loadMore }) => {
    const location = useLocation();

    return (
        <section className="movieslist">
            {location.pathname === '/movies' && (
                <>
                    <ul className="moviescardlist">
                        {movies.map((movie) => (
                            <MoviesCard
                                onSave={onSave}
                                key={(movie.id)}
                                movie={movie}
                            />
                        ))}
                    </ul>
                    {loadMore && <button
                        onClick={onAddMore}
                        className="movieslist__more-button">
                        Ещё
                    </button>}
                </>
            )}
            {location.pathname === '/saved-movies' && (
                    <ul className="moviescardlist">
                        {movies.map((movie) => (
                            <MoviesCard
                                onSave={onSave}
                                key={(movie.id)}
                                movie={movie}
                            />
                        ))}
                    </ul>
            )}
        </section>
    );
};

