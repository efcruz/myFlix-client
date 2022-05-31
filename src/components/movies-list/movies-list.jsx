import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';


const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
      
        filteredMovies = movies.filter(m => 
           m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
        );
    }

    if (!movies) return <div className='main-view' />;

    return (
        <>
             <Col md={12} style={{ marginBottom: '1em' }}>
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Col>

            {filteredMovies.map(m => (
                
                <Col xs={8} sm={8} md={12} lg={3} key={m._id}>
                    <MovieCard movie={m} />
                </Col>
            ))}
        </>
    )
}

export default connect(mapStateToProps)(MoviesList);