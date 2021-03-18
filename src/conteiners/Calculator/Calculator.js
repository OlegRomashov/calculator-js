import React, {Component} from 'react'
import './Calculator.css'
import Scoreboard from '../Scoreboard/Scoreboard'
import Keybord from '../Keyboard/Keyboard'
import Pane from '../Pane/Pane'
import Log from '../Log/Log'
import Converter from '../Converter/Converter'
// import calculate from '../../utils/utils'

class Calculator extends Component {
    state = {
        inputField: [],
        resultField: [],
        operation: null,
        prevNumber: null,
        prevOperation: null,
        openLogDrawer: false,
        openConverterDrawer: false,
        cases: [
            {id: 1, field: '75-56', equally: 19},
            {id: 2, field: '24+34', equally: 57},
            {id: 3, field: '44*2', equally: 88},
            {id: 4, field: '75-56', equally: 19},
            {id: 5, field: '24+34', equally: 57},
            {id: 6, field: '44*2', equally: 88},
            {id: 7, field: '44/11', equally: 4},
            {id: 8, field: '75-56', equally: 19},
            {id: 9, field: '24+34', equally: 57},
            {id: 10, field: '44*2', equally: 88},
        ]
    }

    onExampleHandler = id => {
        const example = this.state.cases[id - 1]
        console.log(example.equally)
    }

    onClickDrawer = id => {
        if(id === 1 ) {
            this.onLogDrawerHandler()
        } else if (id === 2) {
            this.onConverterDrawerHandler()
        } else {this.onDeletSymbolHandler()}
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

    onDeletSymbolHandler = () => {
        if(this.state.inputField.length === 0) {
            return
        }
        const field = [...this.state.inputField]
        field.splice(-1, 1)
        this.setState({
            inputField: field
        })
    }

    onLogClearHandler = () => {
        this.setState({
            cases: [],
            openLogDrawer: false
        })
    }

    onKeyboardHandler = (id) => {
        const inputField = [...this.state.inputField]
        inputField.push(id)
        const input = inputField.join('')
        const res = input
        this.setState({
            inputField: input,
            resultField: res
        })
    }

    onBackDropHandler = () => {
        this.setState({
            openConverterDrawer: false
        })
    }

    onChangeInput = (event) => {
        const symbols = ['(', ')', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', ',', '=']
        const value = event.target.value
        const last = value[value.length-1]
        if(symbols.includes(last)) {
            const res = [...value]
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

export default Calculator;
