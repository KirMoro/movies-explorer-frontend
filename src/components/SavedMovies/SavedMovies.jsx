import './SavedMovies.css';
import {movies} from "../../__fixtures__/movies";
import {SearchForm} from "../Movies/SearchForm/SearchForm";
import {MoviesCardList} from "../Movies/MoviesCardList/MoviesCardList";

export const SavedMovies = () => {
    return (
        <section className="savedmovies">
            <SearchForm/>
            <MoviesCardList
                movies={movies}
            />
        </section>
    );
};

