import './MoviesCardList.css';
import {MoviesCard} from "../MoviesCard/MoviesCard";

export const MoviesCardList = ({movies}) => {
    return (
        <section className="movieslist">
            <ul className="moviescardlist">
                {movies.map((movie) => (
                    <MoviesCard
                        key={(movie.movieId)}
                        movie={movie}
                    />
                ))}
            </ul>
            <button className="moviescardlist__more-button">
                Ещё
            </button>
        </section>
    );
};

