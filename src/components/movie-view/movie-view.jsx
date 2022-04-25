import React from "react";
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props
        return (
            <div className="movie-view">
                <div className="movie-poster"> 
                    <img className="poster" src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title:</span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description:</span>
                    <span className="value">{movie.Description}</span>
                </div>
                <button onClick = {() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired}).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        }).isRequired,
        ImagePath: PropTypes.string.isRequired,
        Feature: PropTypes.bool.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};