import './Movies.css';
import {SearchForm} from "./SearchForm/SearchForm";
import {MoviesCardList} from "./MoviesCardList/MoviesCardList";
import {movies} from "../../__fixtures__/movies";
import {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";

export const Movies = ({isLoaded, onSearch, movies, setSearchRequest, handleSaveMovies}) => {

    return (
        <section className="movies">
            <SearchForm
                onSearch={onSearch}
                setSearchRequest={setSearchRequest}
            />
            {isLoaded ? <MoviesCardList
                        onSave={handleSaveMovies}
                        movies={movies}
                    /> : <Preloader /> }
        </section>
    );
};

