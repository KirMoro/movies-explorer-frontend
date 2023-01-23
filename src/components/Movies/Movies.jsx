import './Movies.css';
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import {movies} from "../../__fixtures__/movies";

export const Movies = () => {
    return (
        <section className="movies">
            <SearchForm/>
            <MoviesCardList
                movies={movies}
            />
        </section>
    );
};

