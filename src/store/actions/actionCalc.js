import axios from '../../axios/axios-case'
import {FETCH_EXAMPLES_ERROR, FETCH_EXAMPLES_SUCCESS} from "./actionTypes";

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
            // this.setState({
            //     cases
            // })
        } catch (e) {
            dispatch(fetchExamplesError(e))
        }
    }
}

export function fetchExamplesSuccess (cases) {
    return {
        type: FETCH_EXAMPLES_SUCCESS,
        cases
    }
}

export function fetchExamplesError (e) {
    return {
        type: FETCH_EXAMPLES_ERROR,
        error: e
    }
}

export function clearExamples() {
    return async dispatch => {

    }
}

export function createCase() {
    return async dispatch => {

    }
}