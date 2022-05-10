import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardGroup, Container } from 'react-bootstrap';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import './main-view.scss';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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
    this.setState({
      register: true,
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;
    
      return (
        <Router>
          <Container>
            <Row>

              <Route exact path="/" render={() => {
                if (!user)
                  return (
                    <Col xs={10} md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col> );
                if (movies.lenght === 0) return <div className="main-view" />;
                return movies.map(movie => (
                  <Col md={3} key={movie._id}>
                    <MovieCard movieData={movie} />
                  </Col>
                ))
              }} />

              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                return (
                  <Col xs={10} md={6}>
                    <RegistrationView
                      onBackClick={() => {
                        this.onRegistration();
                      }} />
                  </Col>
                )
              }} />

              <Route path="/movies/:movieId" render={({ match, history }) => { 
                if (!user)
                return (
                  <Col xs={10} md={6}>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col> );
                if (movies.lenght === 0) return <div className="main-view" />;
                return (
                 <Col md={8}>
                   <MovieView 
                     movie={movies.find(movie => movie._id === match.params.movieId)} 
                     onBackClick={() => history.goBack()} />
                 </Col>
               )}} />

               <Route exact path="/director/:name" render={( { match, history } ) => {
                 if (!user)
                 return (
                   <Col xs={10} md={6}>
                     <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                   </Col> );
                 if (movies.lenght === 0) return <div className="main-view" />;
                 return (
                   <DirectorView 
                    director={movies.find(movie => movie.Director.Name === match.params.name).Director}
                    onBackClick={() => history.goBack()} />
                 )
               }} />

              <Route exact path="/genre/:name" render={( { match, history } ) => {
                if(!user) return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col> );
                if(movies.length === 0) return <div className="main-view" />;
                return (
                <Col md={8}>
                  <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
                </Col> );
              }} />


         
            </Row>
          </Container>
        </Router>
    )
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
    Feature: PropTypes.bool.isRequired
  })
};