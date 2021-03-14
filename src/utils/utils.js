function calculate(id) {
    switch (true) {
        case id >= 0 && id <=9:
            const field = [...this.state.inputField]
            field.push(id)
            this.setState({
                inputField: field
            })
            break
        default:
            console.log("Sorry")
    }
}

export default calculate



// || id === '/' || id === '*' || id === '+' || id === ','

