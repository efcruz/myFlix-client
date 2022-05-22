import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="card-movie-card">
        <Card.Img
          variant="top"
          className="poster"
          src={movie.ImagePath}
          crossOrigin="anonymous"
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <div>
          <Link to={`/movies/${movie._id}`}>
            <Button
              style={{ marginBottom: '30px', marginLeft: '30px' }}
              className="btn-primary"
              fluid="true"
              variant="link">
              Open
            </Button>
          </Link>
        </div>
      </Card>
    );
  }
}



MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  })
};
