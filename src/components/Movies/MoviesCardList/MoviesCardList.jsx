import './MoviesCardList.css';
import {MoviesCard} from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {constants} from "../../../utils/constants";

export const MoviesCardList = ({movies, onSave, searchError, searchSaveError }) => {
    const [index, setIndex] = useState({
        start: constants.INITIAL_MOVIES_CARDS_L,
        load: constants.ADD_MOVIES_CARDS_L,
    });
    const [loadMore, setLoadMore] = useState(true);

    const location = useLocation();

    const handleRenderCounter = (movies) => {
        if (window.innerWidth > 1196) {
            setIndex({
                start: constants.INITIAL_MOVIES_CARDS_L,
                load: constants.ADD_MOVIES_CARDS_L,
            })
        }

        if (window.innerWidth < 1200) {
            setIndex({
                start: constants.INITIAL_MOVIES_CARDS_M,
                load: constants.ADD_MOVIES_CARDS_M,
            })
        }

        if (window.innerWidth < 767) {
            setIndex({
                start: constants.INITIAL_MOVIES_CARDS_S,
                load: constants.ADD_MOVIES_CARDS_S,
            })
        }
    };

    const renderMovies = movies.slice(0, index.start);

    const handleHasMore = () => {
        setIndex({
            start: index.start + index.load,
            load: index.load,
        })

        if (renderMovies.length >= movies.length - index.load) {
            setLoadMore(false)
        }
    }

    useEffect(() => {
        if (movies.length <= index.load) {
            setLoadMore(false)
        } else {
            setLoadMore(true)
        }

        window.addEventListener("resize", handleRenderCounter);

        return () => window.removeEventListener("resize", handleRenderCounter);
    }, [movies, index.load]);

    return (
        <section className="movieslist">
            {location.pathname === '/movies' && !searchError && (
                <>
                    <ul className="moviescardlist">
                        {renderMovies.map((movie) => (
                            <MoviesCard
                                onSave={onSave}
                                key={(movie.id)}
                                movie={movie}
                            />
                        ))}
                    </ul>
                    {loadMore && <button
                        onClick={handleHasMore}
                        className="movieslist__more-button">
                        Ещё
                    </button>}
                </>
            )}
            {location.pathname === '/saved-movies' && !searchSaveError && (
                    <ul className="moviescardlist">
                        {movies.map((movie) => (
                            <MoviesCard
                                onSave={onSave}
                                key={(movie._id)}
                                movie={movie}
                            />
                        ))}
                    </ul>
            )}
            {searchError || searchSaveError && (
                <div className="article">
                    <h2 className="article__title">Ничего не найдено</h2>
                </div>
            )}
        </section>
    );
};

