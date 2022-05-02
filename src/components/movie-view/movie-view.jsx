import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Row, Col, Button, Image } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Row>
        <Col>
          <Image
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
            <Button
              style={{
                marginLeft: '0px',
                marginBottom: '0px',
                marginTop: '30px',
              }}
              className="btn-primary"
              variant="primary"
              onClick={() => {
                onBackClick(null);
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
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
