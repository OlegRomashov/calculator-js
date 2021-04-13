import React, {Component} from 'react'
import {create, all} from 'mathjs'
import './Calculator.css'
import Scoreboard from '../Scoreboard/Scoreboard'
import Keybord from '../Keyboard/Keyboard'
import Pane from '../Pane/Pane'
import Log from '../Log/Log'
import Converter from '../Converter/Converter'
import axios from '../../axios/axios-case'

const config = { }
const math = create(all, config)

class Calculator extends Component {
    state = {
        inputField: '',
        resultField: '',
        lastOperation: '',
        openLogDrawer: false,
        openConverterDrawer: false,
        case: {
            field: '',
            equally: ''
        },
        cases: []
    }

    onExampleHandler = index => {
        const equally = this.state.cases[index].equally.toString()
        this.setState({
            inputField: equally,
            resultField: ''
        })
    }

    onClickDrawer = id => {
        if(id === 1 ) {
            this.onLogDrawerHandler()
        } else if (id === 2) {
            this.onConverterDrawerHandler()
        } else {this.onDeleteSymbolHandler()}
    }

    onLogDrawerHandler = () => {
        this.setState({
            openLogDrawer: !this.state.openLogDrawer,
        })
    }

    onConverterDrawerHandler = () => {
        this.setState({
            openConverterDrawer: !this.state.openConverterDrawer,
            openLogDrawer: false
        })
    }

    onDeleteSymbolHandler = () => {
        const symbols = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        if(this.state.inputField.length !== 0) {
            const field = [...this.state.inputField]
            field.splice(-1, 1)
            const symbol = field[field.length-1]
            const inputField = field.join('').toString()
            this.setState({
                inputField
            })
            if(symbols.includes(symbol)) {
                const code = math.compile(inputField)
                const res = code.evaluate()
                this.setState({
                    resultField: res
                })
            } else {
                this.setState({
                    resultField: ''
                })
            }

        }
    }

    onLogClearHandler = async () => {
        this.setState({
            cases: [],
            openLogDrawer: false
        })

        try {
            await axios.delete('/cases.json')
        } catch (e) {
            console.log(e)
        }

    }

    onBackDropHandler = () => {
        this.setState({
            openConverterDrawer: false
        })
    }

    onKeyboardHandler = async id => {
        const symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const operations = ['/', '*', '+', '-']
        const lastOperation = this.state.lastOperation
        const cAse = {}
        const inputField = [...this.state.inputField]
        const lastSymbol = inputField[inputField.length-1]
        const revInputField = [...inputField].reverse()
        const position = revInputField.indexOf(lastOperation)
        const minArr = inputField.slice(-position)

        if(lastOperation === '=') {
            this.setState({
                inputField: ''
            })
        }

        if(symbols.includes(id)){
                  inputField.push(id)
            const input = inputField.join('').toString()
            const code = math.compile(input)
            const res = code.evaluate()
            this.setState({
                inputField: input,
                resultField: res
            })
        } else if(id === 'C') {
            this.setState({
                inputField: '',
                resultField: ''
            })
        } else if(id === '%') {
            console.log('%')
        } else if(id === '.') {
            if(inputField.length === 0) {
                this.setState({
                    inputField: '0.',
                    resultField: '0.'
                })
            } else if(lastSymbol === '.') {
                return
            } else if(operations.includes(lastSymbol)) {
                inputField.push('0.')
                const input = inputField.join('').toString()
                this.setState({
                    inputField: input
                })
            } else if(inputField.includes('.')) {

                if(minArr.includes('.')) {
                    return
                }
                inputField.push('.')
                const input = inputField.join('').toString()
                this.setState({
                    inputField: input
                })
            } else {
                inputField.push(id)
                const input = inputField.join('').toString()
                this.setState({
                    inputField: input
                })
            }
        } else if(id === '+/-') {
            console.log('+/-')
        } else if(id === '()') {
            console.log('()')
        } else if(id === "=") {
            if(operations.includes(lastSymbol)) {
                return
            }
            const input = inputField.join('').toString()
            const code = math.compile(input)
            const res = code.evaluate().toString()
                  cAse.field = input
                  cAse.equally = res
            this.setState({
                inputField: res,
                resultField: '',
                case: cAse,
                lastOperation: id
            })
            console.log(this.state)
            try {
                await axios.post('/cases.json', cAse)
            } catch (e) {
                console.log(e)
            }
        } else {
            if(inputField.length !==0) {
                if(operations.includes(lastSymbol)) {
                    inputField.splice(-1, 1)
                          inputField.push(id)
                    const input = inputField.join('').toString()
                    this.setState({
                        inputField: input,
                        lastOperation: id,
                    })
                } else {
                          inputField.push(id)
                    const input = inputField.join('').toString()
                    this.setState({
                        inputField: input,
                        lastOperation: id,
                    })
                }
            }
        }
    }

    onChangeInput = (event) => {
        const symbols = ['(', ')', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', ',', '=']
        const value = event.target.value
        const symbol = value[value.length-1]
        if(symbols.includes(symbol)) {
            const res = value
            this.setState({
                inputField: value,
                resultField: res
            })
        }
    }

    async componentDidMount() {
       try {
           const response = await axios.get('/cases.json')
           const data = response.data
           const cases = []
           for (let code in data) {
               cases.push(data[code]);
           }
           this.setState({
               cases
           })
       } catch (e) {
           console.log(e)
       }
    }

    async componentDidUpdate() {
        try {
            const response = await axios.get('/cases.json')
            const data = response.data
            const cases = []
            for (let code in data) {
                cases.push(data[code]);
            }
            this.setState({
                cases
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={'Calculator'}>
                <Scoreboard
                    inputField={this.state.inputField}
                    resultField={this.state.resultField}
                    onChangeInput={event => this.onChangeInput(event)}
                />
                <Pane
                    onClickDrawer={this.onClickDrawer}
                    openLogDrawer={this.state.openLogDrawer}
                    casesLength={this.state.cases.length}
                    inputFieldLength={this.state.inputField}
                />
                {this.state.openLogDrawer
                    ? <Log
                        cases={this.state.cases}
                        onClickExample={this.onExampleHandler}
                        onClickLogClear={this.onLogClearHandler}
                    />
                    : null
                }
                <Keybord
                    onKeyboardClick = {this.onKeyboardHandler}
                />
                {this.state.openConverterDrawer
                    ? <Converter
                        onClickUnit={this.onUnitHandler}
                        onCloseBackDrop={this.onBackDropHandler}
                    />
                    : null
                }
            </div>
        )
    }
}

export default Calculator
