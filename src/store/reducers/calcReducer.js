import {
    FETCH_EXAMPLES_ERROR, FETCH_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_SUCCESS,
    CLEAR_EXAMPLES_ERROR, OPEN_LOGDRAWER, CONVERTER_DRAWER, EXAMPLE_TO_INPUT,
    CLOSE_BACK_DROP, ENTERING_NUMBERS
} from "../actions/actionTypes";

const initialState = {
    inputField: '',
    resultField: '',
    lastOperation: '',
    openLogDrawer: false,
    openConverterDrawer: false,
    case: {},
    cases: [],
    error: null
}

export default function calcReducer(state = initialState, action) {
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
                ...state, openLogDrawer: !state.openLogDrawer
            }
        case CONVERTER_DRAWER:
            return {
                ...state, openConverterDrawer: true, openLogDrawer: false
            }
        case EXAMPLE_TO_INPUT:
            return {
                ...state, inputField: action.payload, resultField: ''
            }
        case CLOSE_BACK_DROP:
            return {
                ...state, openConverterDrawer: false
            }
        case ENTERING_NUMBERS:
            return {
                ...state, inputField: action.input, resultField: action.res
            }
        default:
            return state
    }
}