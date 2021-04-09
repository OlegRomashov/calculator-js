import React, {Component} from 'react'
import {create, all} from 'mathjs'
import './Calculator.css'
import Scoreboard from '../Scoreboard/Scoreboard'
import Keybord from '../Keyboard/Keyboard'
import Pane from '../Pane/Pane'
import Log from '../Log/Log'
import Converter from '../Converter/Converter'
// import {calculate} from '../../utils/calculate'

const config = { }
const math = create(all, config)

class Calculator extends Component {
    state = {
        inputField: '',
        resultField: '',
        lastOperation: '',
        // prevNumber: null,
        // prevOperation: null,
        openLogDrawer: false,
        openConverterDrawer: false,
        cases: [
            {field: '75-56', equally: 19},
            // {field: '24+34', equally: 57},
            // {field: '44*2', equally: 88},
            // {field: '75-56', equally: 19},
            // {field: '124+234', equally: 357},
            // {field: '44*2', equally: 88},
            // {field: '44/11', equally: 4},
            // {field: '75-56', equally: 19},
            // {field: '24+34', equally: 57},
            // {field: '44*2', equally: 88},
        ]
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

    onLogClearHandler = () => {
        this.setState({
            cases: [],
            openLogDrawer: false
        })
    }

    onBackDropHandler = () => {
        this.setState({
            openConverterDrawer: false
        })
    }

    onKeyboardHandler = (id) => {
        const symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const operations = ['/', '*', '+', '-']
        const lastOperation = this.state.lastOperation
        const cases = [...this.state.cases]
        const inputField = [...this.state.inputField]
        const lastSymbol = inputField[inputField.length-1]

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
        }

        else if(id === '.') {
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
                const revInputField = [...inputField].reverse()
                console.log('revInputField', revInputField)
                console.log('lastOperation', lastOperation)
                const position = revInputField.indexOf(lastOperation)
                console.log('position', position)
                const minArr = inputField.slice(-position)
                console.log('minArr', minArr)
                if(minArr.includes('.')) {
                    return
                }
                inputField.push('.')
                console.log('inputField', inputField)
                const input = inputField.join('').toString()
                this.setState({
                    inputField: input
                })
            }

            else {
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
            const input = inputField.join('').toString()
            const code = math.compile(input)
            const res = code.evaluate().toString()
            cases.push({field: input, equally: res})
            this.setState({
                inputField: res,
                resultField: '',
                cases
            })
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
