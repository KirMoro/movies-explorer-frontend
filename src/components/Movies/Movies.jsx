import './Movies.css';
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";

export const Movies = ({isLoaded, onSearch, movies, searchRequest, handleSaveMovies, searchError }) => {
    const [index, setIndex] = useState({
        start: 12,
        load: 3,
    });
    const [loadMore, setLoadMore] = useState(true);

    const handleLoadMore = () => {
        if (movies.length <= index.start) {
            setLoadMore(!loadMore)
        }
    }

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

    const itemsToRender = movies.slice(0, index.start);

    const handleHasMore = () => {
        setIndex({
            start: index.start + index.load,
            load: index.load,
        })
    }

    // useEffect(() => {
    //     const handleWindowLoad = () => {
    //             if (movies.length <= index.start) {
    //                 setLoadMore(!loadMore)
    //             }
    //     };
    //
    //     window.addEventListener('load', handleWindowLoad);
    //
    //     return () => window.removeEventListener('load', handleWindowLoad);
    // }, [movies.length])

    useEffect(() => {
        window.addEventListener("resize", handleRenderCounter);

        return () => window.removeEventListener("resize", handleRenderCounter);
    }, []);

    // console.log(movies.length)
    // console.log(loadMore)


    return (
        <section className="movies">
            <SearchForm
                searchRequest={searchRequest}
                onSearch={onSearch}
            />
            {isLoaded ? <MoviesCardList
                        onAddMore={handleHasMore}
                        onSave={handleSaveMovies}
                        movies={itemsToRender}
                        loadMore={loadMore}
                        searchError={searchError}
                    /> : <Preloader />}
        </section>
    );
};

