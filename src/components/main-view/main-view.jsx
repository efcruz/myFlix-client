import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Button from '@restart/ui/esm/Button';

export class MainView extends React.Component {
  constructor() {
    //create the component
    super(); //initializes the component’s state
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false,
    };
  }

  componentDidMount() {
    axios
      .get('https://my-flix-movie-app.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegistration() {
    this.setState({
      register: true,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (movies.lenght === 0) return <div className="main-view" />;

    if (register) {
      return (
        <RegistrationView
          onBackClick={() => {
            this.onRegistration();
          }}
        ></RegistrationView>
      );
    }

    if (!user)
      return (
        <div>
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          <p>Doesn't have an account?</p>
          <Button
            variant="link"
            onClick={() => {
              this.onRegistration();
            }}
          >
            Register
          </Button>
        </div>
      );

    if (selectedMovie) {
      return (
        <Row className="main-view justify-content-md-center">
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className="main-view justify-content-md-center">
          {movies.map((movie) => (
            <Col md={3}>
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={(movie) => {
                  this.setSelectedMovie(movie);
                }}
              />
            </Col>
          ))}
        </Row>
      );
    }
  }
}

MainView.propTypes = {
  movies: PropTypes.shape({
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
    Feature: PropTypes.bool.isRequired,
  }),
};
