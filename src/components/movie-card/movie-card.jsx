import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;

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
          <Link to={`/movies/${movieData._id}`}>
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
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired
};
