import './SavedMovies.css';
import {SearchForm} from "../Movies/SearchForm/SearchForm";
import {MoviesCardList} from "../Movies/MoviesCardList/MoviesCardList";

export const SavedMovies = ({ movies, onSearch, setSearchRequest, handleSaveMovies }) => {
    const filterMovies = movies.filter((movie) => movie.isSaved)

    return (
        <section className="savedmovies">
            <SearchForm
                onSearch={onSearch}
                setSearchRequest={setSearchRequest}
            />
            <MoviesCardList
                onSave={handleSaveMovies}
                movies={filterMovies}
            />
        </section>
    );
};

