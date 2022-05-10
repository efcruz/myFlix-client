import React, { useState } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './director-view.scss';

export function DirectorView(props) {

    const { director, onBackClick } = useState('');

    return (
        <Row>
            <Col>
                <Image
                    className="poster"
                    src={director.ImagePath}
                    crossOrigin="anonymous"
                />
            </Col>
            <Col>
                <div>
                    <span className="label">{director.Name}</span>
                    <hr></hr>
                    <span className="label">Born: </span>
                    <br></br>
                    <span className="value">{director.Birth} </span>
                    <br></br>
                    <span className="label">{director.Bio}</span>
                </div>
                <div className="btn-box">
                    <Button
                    style={{
                        marginLeft: '0px',
                        marginBottom: '0px',
                        marginTop: '30px',
                    }}
                    className="btn-primary"
                    variant="primary"
                    onClick={() => {
                        onBackClick();
                    }}
                    >
                    Back
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

DirectorView.propTypes = {
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
      }).isRequired
  };