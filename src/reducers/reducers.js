import { combineReducers } from 'redux';

import { SET_MOVIES, SET_FILTER } from '../actions/actions';

//return the text input in the search bar
function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}


function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
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