import React, {Component} from 'react'
import './Calculator.css'
import Scoreboard from '../Scoreboard/Scoreboard'
import Keybord from '../Keyboard/Keyboard'
import Pane from '../Pane/Pane'
import Log from '../Log/Log'
import Converter from '../Converter/Converter'
// import {calculate} from '../../utils/calculate'

class Calculator extends Component {
    state = {
        inputField: '',
        resultField: '',
        // operation: null,
        // prevNumber: null,
        // prevOperation: null,
        openLogDrawer: false,
        openConverterDrawer: false,
        cases: [
            {field: '75-56', equally: 19},
            {field: '24+34', equally: 57},
            {field: '44*2', equally: 88},
            {field: '75-56', equally: 19},
            {field: '124+234', equally: 357},
            {field: '44*2', equally: 88},
            {field: '44/11', equally: 4},
            {field: '75-56', equally: 19},
            {field: '24+34', equally: 57},
            {field: '44*2', equally: 88},
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
        if(this.state.inputField.length !== 0) {
            const field = [...this.state.inputField]
            field.splice(-1, 1)
            const inputField = field.join('')
            const res = inputField//todo calculate result
            this.setState({
                inputField: inputField,
                resultField: res
            })
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
        const inputField = [...this.state.inputField]
        inputField.push(id)
        const input = inputField.join('')
        const res = input//todo calculate result
        this.setState({
            inputField: input,
            resultField: res
        })
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
