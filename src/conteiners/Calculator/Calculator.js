import React, {Component} from 'react'
import {create, all} from 'mathjs'
import './Calculator.css'
import Scoreboard from '../Scoreboard/Scoreboard'
import Keybord from '../Keyboard/Keyboard'
import Pane from '../Pane/Pane'
import Log from '../Log/Log'
import Converter from '../Converter/Converter'
import {connect} from 'react-redux'
import {
    fetchExamples,
    clearExamples,
    logDrawer,
    exampleToInput,
    converterDrawer,
    closeBackDrop,
    deleteSymbol,
    keyboard
} from '../../store/actions/actionCalc'

const config = {}
const math = create(all, config)

class Calculator extends Component {

    onExampleHandler = index => {
        const equally = this.props.cases[index].equally.toString()
        this.props.exampleToInput(equally)
    }

    onClickDrawer = id => {
        if (id === 1) {
            this.props.logDrawer()
        } else if (id === 2) {
            this.props.converterDrawer()
        } else {
            this.props.deleteSymbol()
        }
    }

    onChangeInput = (event) => {
        const symbols = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.']
        const value = event.target.value
        console.log(typeof value)
        const symbol = value[value.length - 1]
        if (symbols.includes(symbol)) {
            const code = math.compile(value)
            console.log(typeof code)
            const res = code.evaluate().toString()
            this.setState({
                inputField: value,
                resultField: res
            })
        }
    }

    componentDidMount() {
        this.props.fetchExamples()
    }

    componentDidUpdate() {

        // try {
        //     const response = await axios.get('/cases.json')
        //     const data = response.data
        //     const cases = []
        //     for (let example in data) {
        //         cases.push(data[example]);
        //     }
        //     this.setState({
        //         cases
        //     })
        // } catch (e) {
        //     console.log(e)
        // }
    }

    render() {
        return (
            <div className={'Calculator'}>
                <Scoreboard
                    inputField={this.props.inputField}
                    resultField={this.props.resultField}
                    onChangeInput={event => this.onChangeInput(event)}
                />
                <Pane
                    onClickDrawer={this.onClickDrawer}
                    openLogDrawer={this.props.openLogDrawer}
                    casesLength={this.props.cases.length}
                    inputFieldLength={this.props.inputField}
                />
                {this.props.openLogDrawer
                    ? <Log
                        cases={this.props.cases}
                        onClickExample={this.onExampleHandler}
                        onClickLogClear={this.props.clearExamples}
                    />
                    : null
                }
                <Keybord
                    onKeyboardClick={this.props.keyboard}
                />
                {this.props.openConverterDrawer
                    ? <Converter
                        onClickUnit={this.onUnitHandler}
                        onCloseBackDrop={this.props.closeBackDrop}
                    />
                    : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        inputField: state.calcReducer.inputField,
        resultField: state.calcReducer.resultField,
        lastOperation: state.calcReducer.lastOperation,
        openLogDrawer: state.calcReducer.openLogDrawer,
        openConverterDrawer: state.calcReducer.openConverterDrawer,
        case: state.calcReducer.case,
        cases: state.calcReducer.cases
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchExamples: () => dispatch(fetchExamples()),
        clearExamples: () => dispatch(clearExamples()),
        logDrawer: () => dispatch(logDrawer()),
        exampleToInput: (equally) => dispatch(exampleToInput(equally)),
        converterDrawer: () => dispatch(converterDrawer()),
        closeBackDrop: () => dispatch(closeBackDrop()),
        deleteSymbol: () => dispatch(deleteSymbol()),
        keyboard: (id) => dispatch(keyboard(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
