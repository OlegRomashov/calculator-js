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

    onKeyboardHandler = id => {
        const field = [...this.state.inputField]
        switch (id) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                field.push(id)
                const res = field.join('')
                console.log(typeof res)
                this.setState({
                    inputField: field,
                    resultField: res
                })
                break
            case 10:
                // field.push('+')
                //  const res2 = eval(field.join(''))
                // this.setState({
                //     inputField: field,
                //     resultField: res2
                // })
                break
            case 'C':
                this.setState({
                    inputField: [],
                    resultField: []
                })
                break

            default:
                console.log("Sorry")
        }
    }

    onBackDropHandler = () => {
        this.setState({
            openConverterDrawer: false
        })
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
