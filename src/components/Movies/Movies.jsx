import './Movies.css';
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export const Movies = ({isLoaded, onSearch, movies, handleSaveMovies, searchError }) => {

    return (
        <section className="movies">
            <SearchForm
                onSearch={onSearch}
            />
            {isLoaded ? <Preloader /> :
                <MoviesCardList
                onSave={handleSaveMovies}
                movies={movies}
                searchError={searchError}
            />}
        </section>
    );
};

