import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardGroup, Container } from 'react-bootstrap';


import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar/navbar-view';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';


import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    //create the component
    super(); //initializes the component’s state
  }

  

  //get request to fetch movies along authorization token
  getMovies(token) {
    axios
      .get('https://my-flix-movie-app.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      
      .then((response) => {
        //Asign the result to the state
        this.props.setMovies(response.data);
      })
      
      .catch((error) => {
        
       
        console.log(error);
      });
  }

  //check if is there a token stored
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null && accessToken !== 'undefined') {
      
      this.props.setUser({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      
      
    }
  }

  //change state and store username and token
  onLoggedIn(authData) {
    console.log(authData.user.Username);
    this.props.setUser({
      
      user: authData.user.Username
      
    });
   
    console.log(authData);
    
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    
    this.getMovies(authData.token);
   
  }
 
  

  render() {
    const { movies, user } = this.props;
      return (
        <Router>
          <NavbarView user={user} />
          <Container className="main-view-container">
            <Row>
              <Route exact path="/" render={() => {
                //If there is no user, the LoginView is rendered. 
                //If there is a user logged in, the user details are passed as a prop to the LoginView
                if (!user)
                
                  return (
                    <Col xs={10} md={6}>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col> );
                
                if (movies.length === 0) return <div className="main-view" />;
               
                return <MoviesList movies={movies} />;
               
                  }} />
                

              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                return (
                  <Col xs={10} md={6}>
                    <RegistrationView />
                  </Col>
                )
              }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
                if(!user) return  <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                if(movies.length === 0) return <div className="main-view" />;
                return <Col>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                  </Col>
              }} />

               <Route path="/director/:name" render={( { match, history } ) => {
                 if (!user)
                  return (
                    <Col xs={10} md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col> );
                 if (movies.length === 0) return <div className="main-view" />;
                  return (
                    
                    <DirectorView 
                      director={movies.find(movie => movie.Director.Name === match.params.name).Director}
                      onBackClick={() => history.goBack()} />
                      
                 )
               }} />

              <Route path="/genre/:name" render={( { match, history } ) => {
                if(!user) return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col> );
                if(movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <GenreView 
                      genre={movies.find(m => m.Genre.Name === match.params.name).Genre} 
                      onBackClick={() => history.goBack()}/>
                  </Col> );
              }} />

              <Route path={`/users/${user}`} render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                  
                if (movies.length === 0) return <div className="main-view" />;
          
                  return (
                    <Col>
                      <ProfileView
                        history={history}
                        movies={movies}
                        user={user}
                        setUser={(user) => this.setUser(user)}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
            </Row>
          </Container>
        </Router>
    )
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

 
MainView.propTypes = {
  movies: PropTypes.array,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }),
    ImagePath: PropTypes.string,
    Feature: PropTypes.bool
}


export default  connect(mapStateToProps, { setMovies, setUser } )(MainView);

