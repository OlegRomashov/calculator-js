import {
    FETCH_EXAMPLES_ERROR, FETCH_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_SUCCESS,
    CLEAR_EXAMPLES_ERROR, OPEN_LOGDRAWER, CONVERTER_DRAWER, EXAMPLE_TO_INPUT,
    CLOSE_BACK_DROP, DELETE_SYMBOL_INPUT, DELETE_SYMBOL_RES_1,
    DELETE_SYMBOL_RES_2, KEY_NUMBER, KEY_C, KEY_DOT, KEY_EQUAL, SEND_EXAMPLE_ERROR,
    KEY_OPERATIONS
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
                ...state, cases: [], openLogDrawer: false, inputField: ''
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
        case DELETE_SYMBOL_INPUT:
            return {
                ...state, inputField: action.inputField
            }
        case DELETE_SYMBOL_RES_1:
            return {
                ...state, resultField: action.res
            }
        case DELETE_SYMBOL_RES_2:
            return {
                ...state, resultField: ''
            }
        case KEY_NUMBER:
            return {
                ...state, inputField: action.input, resultField: action.res
            }
        case KEY_C:
            return {
                ...state, inputField: '', resultField: ''
            }
        case KEY_DOT:
            return {
                ...state, inputField: action.input
            }
        case KEY_EQUAL:
            return {
                ...state, inputField: action.res, resultField: '', cases: action.cases, case: action.example, lastOperation: '='
            }
        case SEND_EXAMPLE_ERROR:
            return {
                ...state, error: action.e
            }
        case KEY_OPERATIONS:
            return {
                ...state, inputField: action.input, lastOperation: action.id
            }
        default:
            return state
    }
}