import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput({ visibilityFilter, setFilter }) {
   
    return <Form.Control
        onChange={e => setFilter(e.target.value)}
        value={visibilityFilter}
        placeholder='filter'
        />
}
//null is being pass because we don't want to subcribe to store updates for this component
export default connect(null, { setFilter })(VisibilityFilterInput);