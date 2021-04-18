import {FETCH_EXAMPLES_ERROR, FETCH_EXAMPLES_SUCCESS} from "../actions/actionTypes";

const initialState = {
    inputField: '',
    resultField: '',
    lastOperation: '',
    openLogDrawer: false,
    openConverterDrawer: false,
    case: {
        field: '',
        equally: ''
    },
    cases: [],
    error: null
}

export default function calcReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_EXAMPLES_SUCCESS:
            return {
                ...state, cases: action.cases
            }
        case FETCH_EXAMPLES_ERROR:
            return {
                ...state, error: action.error
            }
        default:
            return state
    }
}