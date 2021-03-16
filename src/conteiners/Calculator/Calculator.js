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
        resultField: null,
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

    onKeyboardHandler = (id, text) => {
        const inputField = [...this.state.inputField]
        const {operation, prevNumber, prevOperation} = this.state

        if(id >= 0 && id <10) {
            inputField.push(id)
            if(!operation && !prevOperation) {
                const input = inputField.join('')
                const res = parseInt(inputField.join('')) + parseInt(prevNumber)
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
                    prevNumber: null,
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

    onBackDropHandler = () => {
        this.setState({
            openConverterDrawer: false
        })
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className={'Calculator'}>
                <Scoreboard
                    inputField={this.state.inputField}
                    resultField={this.state.resultField}
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
