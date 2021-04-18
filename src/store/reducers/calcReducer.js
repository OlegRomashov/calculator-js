import {FETCH_EXAMPLES_ERROR, FETCH_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_SUCCESS,
    CLEAR_EXAMPLES_ERROR, OPEN_LOGDRAWER, CONVERTER_DRAWER} from "../actions/actionTypes";

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
        case CLEAR_EXAMPLES_SUCCESS:
            return {
                ...state, openLogDrawer: false, inputField: ''
            }
        case CLEAR_EXAMPLES_ERROR:
            return {
                ...state, error: action.error
            }
        case OPEN_LOGDRAWER:
            return {
                ...state, openLogDrawer: !action.openLogDrawer
            }
        case CONVERTER_DRAWER:
            return {
                ...state, openConverterDrawer: !action.openConverterDrawer, openLogDrawer: false
            }
        default:
            return state
    }
}