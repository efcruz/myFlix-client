import { combineReducers } from 'redux';

import { SET_MOVIES, SET_FILTER } from '../actions/actions';

//return the text input in the search bar
function visibilityFilter(state = '', action) {
    /*
    if (action.type === 'SET_FILTERS') {
        return action.value;
    } else {
        return state;
    }
    */

    switch (action.type) {
        case "SET_FILTERS":
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    /*
    if (action.type === 'SET_MOVIES') {
        return action.value;
    } else {
        return state;
    }
    */

    switch (action.type) {
        case "SET_MOVIES":
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp;