import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { Button, Card } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <Card className="card-movie-card">
        <Card.Img
          variant="top"
          className="poster"
          src={movieData.ImagePath}
          crossOrigin="anonymous"
        />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
        </Card.Body>
        <div>
          <Button
            style={{ margin: '30px' }}
            className="btn-primary"
            onClick={() => onMovieClick(movieData)}
            fuid="true"
            variant="primary"
          >
            Open
          </Button>
        </div>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
