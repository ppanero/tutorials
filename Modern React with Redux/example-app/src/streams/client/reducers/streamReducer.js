import _ from 'lodash';

import {CREATE_STREAM,
        DELETE_STREAM,
        EDIT_STREAM,
        FETCH_STREAM,
        FETCH_STREAMS} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case CREATE_STREAM:
        case EDIT_STREAM:
        case FETCH_STREAM:
            // Need to create a new object.
            // Must not mutate state objects, cuz it wont be re-rendered.
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            // The payload is only the id
            return _.omit(state, action.payload)
        case FETCH_STREAMS:
            return { ...state,  ..._.mapKeys(action.payload, 'id') }
        default:
            return state; 
    }
}