import axios from '../../axios/axios-case'
import {create, all} from 'mathjs'
import {
    FETCH_EXAMPLES_ERROR, FETCH_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_ERROR,
    OPEN_LOGDRAWER, CONVERTER_DRAWER, EXAMPLE_TO_INPUT, CLOSE_BACK_DROP, ENTERING_NUMBERS,
    DELETE_SYMBOL_INPUT, DELETE_SYMBOL_RES_1, DELETE_SYMBOL_RES_2
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

export function exampleToInput(equally) {
    return {
        type: EXAMPLE_TO_INPUT,
        payload: equally
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

export function entering_Numbers(input, res) {
    return {
        type: ENTERING_NUMBERS, input, res
    }
}

export function deleteSymbol() {
    return (dispatch, getState) => {
        const state = getState().calcReducer
        console.log(state)
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
