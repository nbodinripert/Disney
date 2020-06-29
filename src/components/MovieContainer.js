import React from 'react';
import { Link } from 'react-router-dom'

// stylesheets
import '../stylesheets/MovieContainer.css';

export const MovieContainer = ({id, img}) => {
    return (
        <Link to={`/movie/${id}`}>
            <div className="movieContainer">
                <img src={img} alt="movieImg"/>
            </div>
        </Link>
    )
}

export default MovieContainer;