import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardGroup, Container } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';

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

  //check if is there a token stored
  componentDidMount() {
    let accessToken = localStorage.getItem('token');

    if (accessToken !== null && accessToken !== 'undefined') {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
 
  //get request to fetch movies along authorization token
  getMovies(token) {
    axios
      .get('https://my-flix-movie-app.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        //Asign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  /*setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }*/

  //change state and store username and token
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistration(data) {
    console.log(data);
    //after registration, user is redirected to login view (_self is for open on same tab)
    /*window.open('/', '_self');*/
    /*this.setState({
      register: true,
    });*/
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user, register } = this.state;

    if (movies.lenght === 0) return <div className="main-view" />;

    if (register) {
      return (
        <Container>
          <Row>
            <Col></Col>
            <Col xs={10} md={6}>
              <RegistrationView
                onBackClick={() => {
                  this.onRegistration();
                }}
              ></RegistrationView>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      );
    }

    if (!user)
      return (
        <Container>
          <Row>
            <Col></Col>
            <Col xs={10} md={6}>
              <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col xs={10} md={6}>
              <Card className="login-card">
                <Card.Body>
                  <Card.Text>Doesn't have an account?</Card.Text>
                  <Button
                    className="btn-outline"
                    variant="outline-primary"
                    onClick={() => {
                      this.onRegistration();
                    }}
                  >
                    Sign up
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      );

    /*if (selectedMovie) {
      return (
        <div className="main-view justify-content-md-center">
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        </div>
      );
    }*/
    
    else {
      return (
        <Router>
          <Row className="main-view justify-content-md-center">
            <Routes>
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            <Route path="/movies/:movieId" render={({ match }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
              </Col>
            }} />
            </Routes>
          </Row>
        </Router>
            );
        }
    }
}


      /*return (
        <Container>
          <Button  style={{
            marginBottom: '30px',
          }} className="btn-primary" variant="primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        <Row className="main-view justify-content-md-center">
          
          <CardGroup>
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
          </CardGroup>
        </Row>
        </Container>
      );
    }*/
 
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
