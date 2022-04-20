import React from "react";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import inception from '../../img/inception.png';
import shawshank from '../../img/shawshank.png';
import gladiator from '../../img/gladiator.png';

export class MainView extends React.Component {

    constructor(){ //create the component
        super(); //initializes the component’s state
        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', ImagePath: inception},
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', ImagePath: shawshank},
                { _id: 3, Title: 'Gladiator', Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', ImagePath: gladiator}
            ],
            selectedMovie: null
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        })

    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.lenght === 0)
        return <div className="main-view">The list is empty!</div>;

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