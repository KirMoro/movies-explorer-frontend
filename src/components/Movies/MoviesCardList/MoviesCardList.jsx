import './MoviesCardList.css';
import {MoviesCard} from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export const MoviesCardList = ({movies, onSave, searchError }) => {
    const location = useLocation();

    const [index, setIndex] = useState({
        start: 12,
        load: 3,
    });
    const [loadMore, setLoadMore] = useState(true);

    const handleRenderCounter = (movies) => {
        if (window.innerWidth > 1196) {
            setIndex({
                start: 12,
                load: 3,
            })
        }

        if (window.innerWidth < 1200) {
            setIndex({
                start: 8,
                load: 2,
            })
        }

        if (window.innerWidth < 767) {
            setIndex({
                start: 5,
                load: 1,
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
            {location.pathname === '/saved-movies' && !searchError && (
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
            {searchError && (
                <div className="article">
                    <h2 className="article__title">Ничего не найдено</h2>
                </div>
            )}
        </section>
    );
};

