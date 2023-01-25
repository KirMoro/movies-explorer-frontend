import './Movies.css';
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {useEffect, useState} from "react";

export const Movies = ({isLoaded, onSearch, movies, setSearchRequest, handleSaveMovies }) => {
    const [index, setIndex] = useState({
        start: 12,
        load: 3,
    });
    const [renderItems, setRenderItems] = useState([]);

    const handleRenderItems = () => {
        setRenderItems(movies.slice(0, index.start))
    }

    const handleRenderCounter = () => {
        if (window.innerWidth > 1196)
            setIndex({
                start: 12,
                load: 3,
            })

        if (window.innerWidth < 1200)
            setIndex({
                start: 8,
                load: 2,
            })

        if (window.innerWidth < 767)
            setIndex({
                start: 5,
                load: 1,
            })
    };

    const itemsToRender = movies.slice(0, index.start);

    const handleHasMore = () => {
        setIndex({
            start: index.start + index.load,
            load: index.load,
        })
    }

    useEffect(() => {
        window.addEventListener("resize", handleRenderCounter);

        return () => window.removeEventListener("resize", handleRenderCounter);
    }, []);

    // console.log(movies.length)

    return (
        <section className="movies">
            <SearchForm
                onSearch={onSearch}
                setSearchRequest={setSearchRequest}
            />
            {isLoaded ? <MoviesCardList
                        onAddMore={handleHasMore}
                        onSave={handleSaveMovies}
                        movies={itemsToRender}
                    /> : <Preloader /> }
        </section>
    );
};

