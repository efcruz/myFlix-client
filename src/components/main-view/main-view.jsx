import React from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){ //create the component
        super(); //initializes the component’s state
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://my-flix-movie-app.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        })

    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user)
            return (
            <div>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                <button>Register
                    <RegistrationView onLoggedIn={user => this.onLoggedIn(user)}/>
                </button>
            </div>
            );
                    
        if (movies.lenght === 0)
        return <div className="main-view" />;

        if (selectedMovie) {
            return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
                this.setSelectedMovie(newSelectedMovie); }} />
        } else {
            return ( 
                <div className="main-view">
                    {movies.map(movie => 
                        <MovieCard 
                            key={movie._id} 
                            movieData={movie} 
                            onMovieClick={(movie) => {
                                this.setSelectedMovie(movie) 
                            }}
                        />)
                    }
                </div>
            )
        }
        }
        
    }

    MainView.propTypes = {
        movies: PropTypes.shape({
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
        }).isRequired
    };