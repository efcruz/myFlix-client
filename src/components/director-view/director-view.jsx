import React, { useState } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './director-view.scss';

export class DirectorView extends React.Component{


    render() {
      const { director, onBackClick} = this.props;

    return (
        <>
        <Row>
            <Col>
            <img
                className="poster"
                src={director.ImageUrl}
                crossOrigin="anonymous"
            />
            </Col>
        </Row>

        <Row>
            <Col med={4} className="director-view bg-light text-black" style={{marginTop: 150}}>
            <div className="director-name" />
            <span className="label">Director: </span>
            <span className="value">{director.Name}</span>
            </Col>
        </Row>
        <Row>
            <Col med={4} className="director-view bg-light text-black">
            <div className="director-name" />
            <span className="label">About: </span>
            <span className="value">{director.Bio}</span>
            </Col>
        </Row>
        <Row>
            <Col med={4} className="director-view bg-light text-black">
            <div className="director-name" />
            <span className="label">Born: </span>
            <span className="value">{director.Birth}</span>
            </Col>
        </Row>
     
        <Row>
            <Col>
        
                <Button  onClick={() => { onBackClick(null); } } variant="danger" style={{marginTop: 50, }}>Back</Button>
          
            </Col>
        </Row>
        </>
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