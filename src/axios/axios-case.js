import axios from 'axios'

export default axios.create({
    baseURL: 'https://calculator-js-a0ec7-default-rtdb.europe-west1.firebasedatabase.app/'
})