import './MoviesCard.css';
import { useContext } from 'react';

export const MoviesCard = ({
                         onCardClick, onCardLike, onCardDelete, movie, onTrashClick,
                     }) => {
    // const currentUserContext = useContext(CurrentUserContext);
    //
    // const isOwn = card.owner === currentUserContext._id;
    // const cardDeleteButtonClassName = (
    //     `elements__trash-button ${isOwn ? 'elements__trash-button_visible' : ''}`
    // );
    //
    // const isLiked = card.likes.some((item) => item === currentUserContext._id);
    // const cardLikeButtonClassName = (
    //     `elements__like-button ${isLiked ? 'elements_like-button_active' : ''}`
    // );
    //
    // function handleClick() {
    //     onCardClick(card);
    // }
    //
    // function handleLikeClick() {
    //     onCardLike(card);
    // }
    //
    // function handleDeleteClick() {
    //     onTrashClick(true);
    //
    //     onCardDelete(card);
    // }

    return (
        <article className="moviescard">
            <img className="moviescard__image" src={movie.image} alt={movie.nameRU} />
            <div className="moviescard__text">
                <h2 className="moviecard__title">{movie.nameRU}</h2>
                <p className="moviescard__duration">{movie.duration}</p>
                <button
                    type="button"
                    className="moviescard__like-button"
                    // onClick={() => handleLikeClick()}
                    aria-label="Понравилось"
                />
                {/*<span className="elements__like-counter">{card.likes.length}</span>*/}
            </div>
            {/*<button type="button" className={cardDeleteButtonClassName} onClick={() => handleDeleteClick()} aria-label="Корзина" />*/}
        </article>
    );
};
