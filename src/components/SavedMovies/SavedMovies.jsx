import './SavedMovies.css';
import {SearchForm} from "../Movies/SearchForm/SearchForm";
import {MoviesCardList} from "../Movies/MoviesCardList/MoviesCardList";

export const SavedMovies = ({ movies, onSearch, setSearchRequest, handleSaveMovies, searchSaveError }) => {
        return (
        <section className="savedmovies">
            <SearchForm
                onSearch={onSearch}
                setSearchRequest={setSearchRequest}
            />
            <MoviesCardList
                onSave={handleSaveMovies}
                movies={movies}
                searchSaveError={searchSaveError}
            />
        </section>
    );
};

