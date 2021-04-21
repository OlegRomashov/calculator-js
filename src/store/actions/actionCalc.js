import axios from '../../axios/axios-case'
import {create, all} from 'mathjs'
import {
    FETCH_EXAMPLES_ERROR, FETCH_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_ERROR,
    OPEN_LOGDRAWER, CONVERTER_DRAWER, EXAMPLE_TO_INPUT, CLOSE_BACK_DROP, DELETE_SYMBOL_INPUT,
    DELETE_SYMBOL_RES_1, DELETE_SYMBOL_RES_2, KEY_NUMBER, KEY_C, KEY_DOT, KEY_EQUAL, SEND_EXAMPLE_ERROR,
    KEY_OPERATIONS
} from "./actionTypes";

const config = {}
const math = create(all, config)

export function fetchExamples() {
    return async dispatch => {
        try {
            const response = await axios.get('/cases.json')
            const data = response.data
            const cases = []
            for (let example in data) {
                cases.push(data[example]);
            }
            dispatch(fetchExamplesSuccess(cases))
        } catch (e) {
            dispatch(fetchExamplesError(e))
        }
    }
}

export function fetchExamplesSuccess(cases) {
    return {
        type: FETCH_EXAMPLES_SUCCESS,
        cases
    }
}

export function fetchExamplesError(e) {
    return {
        type: FETCH_EXAMPLES_ERROR,
        error: e
    }
}

export function clearExamples() {
    return async dispatch => {
        try {
            await axios.delete('/cases.json')
            dispatch({type: CLEAR_EXAMPLES_SUCCESS})
        } catch (e) {
            dispatch({type: CLEAR_EXAMPLES_ERROR, error: e})
        }
    }
}

export function logDrawer() {
    return {
        type: OPEN_LOGDRAWER
    }
}

export function exampleToInput(index) {
    return (dispatch, getState) => {
        const state = getState().calcReducer
        const equally = state.cases[index].equally.toString()
        dispatch({type: EXAMPLE_TO_INPUT, payload: equally
        })
    }
}

export function converterDrawer() {
    return {
        type: CONVERTER_DRAWER
    }
}

export function closeBackDrop() {
    return {
        type: CLOSE_BACK_DROP
    }
}

export function deleteSymbol() {
    return (dispatch, getState) => {
        const state = getState().calcReducer
        const symbols = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        if (state.inputField.length !== 0) {
            const field = [...state.inputField]
            field.splice(-1, 1)
            const symbol = field[field.length - 1]
            const inputField = field.join('').toString()
            dispatch({type: DELETE_SYMBOL_INPUT, inputField})
            if (symbols.includes(symbol)) {
                const code = math.compile(inputField)
                const res = code.evaluate()
                dispatch({type: DELETE_SYMBOL_RES_1, res})
            } else {
                dispatch({type: DELETE_SYMBOL_RES_2})
            }
        }
    }
}

export function keyboard(id) {
    return async (dispatch, getState) => {
        const state = getState().calcReducer
        const symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const operations = ['/', '*', '+', '-']
        const lastOperation = state.lastOperation
        const cases = [...state.cases]
        const example = {}
        const inputField = [...state.inputField]
        const lastSymbol = inputField[inputField.length - 1]
        const revInputField = [...inputField].reverse()
        const position = revInputField.indexOf(lastOperation)
        const minArr = inputField.slice(-position)
        if (symbols.includes(id)) {
            inputField.push(id)
            const input = inputField.join('').toString()
            const code = math.compile(input)
            const res = code.evaluate()
            dispatch({type: KEY_NUMBER, input, res})
        } else if (id === 'C') {
            dispatch({type: KEY_C})
        } else if (id === '.') {
            if (inputField.length === 0 || operations.includes(lastSymbol)) {
                inputField.push('0.')
            } else if (lastSymbol === id) {
                return
            } else {
                if (minArr.includes(id)) {
                    return
                }
                inputField.push(id)
            }
            const input = inputField.join('').toString()
            dispatch({type: KEY_DOT, input})
        } else if (id === '%') {
            console.log('%')
        } else if (id === '+/-') {
            console.log('+/-')
        } else if (id === '()') {
            console.log('()')
        } else if (id === "=") {
            if (operations.includes(lastSymbol)) {
                return
            }
            const input = inputField.join('').toString()
            const code = math.compile(input)
            const res = code.evaluate().toString()
            example.field = input
            example.equally = res
            cases.push(example)
            try {
                await axios.post('/cases.json', example)
                dispatch({type: KEY_EQUAL, res, example, cases})
            } catch (e) {
                dispatch({type: SEND_EXAMPLE_ERROR, error: e})
            }
        } else {
            if (inputField.length !== 0) {
                if (operations.includes(lastSymbol)) {
                    inputField.splice(-1, 1)
                }
                inputField.push(id)
                const input = inputField.join('').toString()
                dispatch({type: KEY_OPERATIONS, input, id})
            }
        }
    }
}
