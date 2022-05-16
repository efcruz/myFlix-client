import React, { useState } from 'react';
import { Row, Col, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './director-view.scss';

export class DirectorView extends React.Component{


    render() {
      const { director, onBackClick} = this.props;
      
    return (
        <Container>
            <Row className='director-view-container'>
                <Col xs={12} md={4} className='director-view-poster-container'>
                    <img
                        className="director-view-poster"
                        src={director.ImageUrl}
                        crossOrigin="anonymous"
                    />
                </Col>
            
                <Col   className="director-view-text-container">
                    <div>
                        <span className="label"><h1>{director.Name}</h1></span>
                        <span className="value">{director.Birth}</span>
                        <hr></hr>
                        <span className="value">{director.Bio}</span>
                    </div>
                    <div>
                        <Button
                            variant="primary"
                            className="btn-primary" 
                            onClick={() => { onBackClick(null); } } 
                            >Back
                        </Button>
                  </div>
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