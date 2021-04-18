import axios from '../../axios/axios-case'
import {FETCH_EXAMPLES_ERROR, FETCH_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_SUCCESS, CLEAR_EXAMPLES_ERROR,
    OPEN_LOGDRAWER, CONVERTER_DRAWER} from "./actionTypes";

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
            dispatch(clearExamplesSuccess())
        } catch (e) {
            dispatch(clearExamplesError(e))
        }
    }
}

export function clearExamplesSuccess() {
    return {
        type: CLEAR_EXAMPLES_SUCCESS
    }
}

export function clearExamplesError(e) {
    return {
        type: CLEAR_EXAMPLES_ERROR,
        error: e
    }
}

export function logDrawer() {
    return {
        type: OPEN_LOGDRAWER
    }
}

export function converterDrawer() {
    return {
        type: CONVERTER_DRAWER
    }
}

export function createCase() {
    return async dispatch => {

    }
}