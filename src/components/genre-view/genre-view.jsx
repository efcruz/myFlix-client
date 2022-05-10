import React, { useState } from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './genre-view.scss';

export function GenreView(props) {

    const { genre, onBackClick } = useState('');

    return (
        <Row>
            <Col>
                <div>
                    <span className="label">{genre.Name}</span>
                    <hr></hr>
                    <span className="value">{genre.Description} </span>
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

GenreView.propTypes = {
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired
  };