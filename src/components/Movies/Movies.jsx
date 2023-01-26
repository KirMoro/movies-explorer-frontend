import './Movies.css';
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export const Movies = ({isLoaded, onSearch, movies, searchRequest, handleSaveMovies, searchError }) => {

    return (
        <section className="movies">
            <SearchForm
                searchRequest={searchRequest}
                onSearch={onSearch}
            />
            {isLoaded ? <MoviesCardList
                        onSave={handleSaveMovies}
                        movies={movies}
                        searchError={searchError}
                    /> : <Preloader />}
        </section>
    );
};

