import React, { useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './director-view.scss';

export class DirectorView extends React.Component{


    render() {
      const { director, onBackClick} = this.props;

    return (
        <Container>
            <Row className='movie-view-container'>
                <Col className='movie-view-poster-container'>
                    <img
                        className="movie-view-poster"
                        src={director.ImageUrl}
                        crossOrigin="anonymous"
                    />
                </Col>
            
                <Col md={8} className="movie-view-text-container">
                    <div>
                        <span className="label"><h1>{director.Name}</h1></span>
                        <span className="value">{director.Birth}</span>
                   
                        <hr></hr>
                        <span className="value">{director.Bio}</span>
                    </div>
                 
                    <Button
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '2'
                          
                        }}  
                        variant="primary"
                        className="btn-primary" 
                        onClick={() => { onBackClick(null); } } >Back</Button>
                  
                </Col>
            </Row>
        </Container>
    )
    }
}

DirectorView.propTypes = {
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
      })
  };