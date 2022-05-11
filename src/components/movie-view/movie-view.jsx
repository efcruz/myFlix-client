import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, Image } from 'react-router-dom';
import PropTypes from 'prop-types';
import './movie-view.scss';

export class MovieView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row>
        <Col>
          <img
            className="poster"
            src={movie.ImagePath}
            crossOrigin="anonymous"
          />
        </Col>

        <Col
          xs={12}
          md={8}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}
        >
          <div>
            <span className="label">{movie.Title}</span>
            <hr></hr>
            <span className="label">Description: </span>
            <br></br>
            <span className="value">{movie.Description}</span>
            <br></br>
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
            <br></br>
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <div className="btn-box">
            <Link to={`/director/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>

            <Link to={`/genre/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
            <Button
              style={{
                marginLeft: '0px',
                marginBottom: '0px',
                marginTop: '30px',
              }}
              className="btn-primary"
              variant="primary"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired
  })
};