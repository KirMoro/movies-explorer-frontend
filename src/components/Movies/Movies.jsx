import './Movies.css';
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import {movies} from "../../__fixtures__/movies";

export const Movies = ({onSearch}) => {
    return (
        <section className="movies">
            <SearchForm
            onSearch={onSearch}
            />
            <MoviesCardList
                movies={movies}
            />
        </section>
    );
};

