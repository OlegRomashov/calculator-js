function calculate(id, text) {
    const inputField = [...this.state.inputField]
    const {operation, prevNumber, prevOperation} = this.state

    if(id >= 0 && id <10) {
        inputField.push(id)
        if(!operation && !prevOperation) {
            const input = inputField.join('')
            const res = eval(inputField.join(''))+prevNumber
            this.setState({
                inputField: input,
                resultField: res
            })
        } else {
            const input = inputField.join('')
            const res = input
            console.log(res)
            this.setState({
                inputField: input,
                resultField: res
            })
        }

    }  else if (id > 9 && id < 14 ){
        inputField.push(text)
        const input = inputField.join('')
        console.log(input)
        if(prevOperation) {

            this.setState({
                operation: text,
                prevOperation: text,
                prevNumber: input,
                inputField: input
            })
        } else {
            this.setState({
                operation: text,
                prevOperation: null,
                prevNumber: input,
                inputField: input
            })
        }

    } else if(id === 'C') {
        this.setState({
            inputField: [],
            resultField: []
        })
    } else if (id === '()'){

    } else if (id === '%'){

    } else if (id === '+/-'){

    } else if (id === ','){

    } else if (id === '='){
        this.setState({
            operation: text,
            previous: null
        })
    }
}

export default calculate





