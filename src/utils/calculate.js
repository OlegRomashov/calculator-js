export function calculate(arr, id) {
    const inputField = [...arr]
    inputField.push(id)
    const input = inputField.join('')
    const res = input
    this.setState({
        inputField: input,
        resultField: res
    })
}

