import React, {Component} from 'react'
import {create, all} from 'mathjs'
import './Calculator.css'
import Scoreboard from '../Scoreboard/Scoreboard'
import Keybord from '../Keyboard/Keyboard'
import Pane from '../Pane/Pane'
import Log from '../Log/Log'
import Converter from '../Converter/Converter'
import {connect} from 'react-redux'
import {fetchExamples, clearExamples, createCase, logDrawer, converterDrawer} from '../../store/actions/actionCalc'

const config = { }
const math = create(all, config)

class Calculator extends Component {
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
        this.props.logDrawer()
        // this.setState({
        //     openLogDrawer: !this.state.openLogDrawer,
        // })
    }

    onConverterDrawerHandler = () => {
        this.props.converterDrawer()
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
        this.props.clearExamples()
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
            if(inputField.length === 0 || operations.includes(lastSymbol)) {
                inputField.push('0.')
            } else if(lastSymbol === id) {
                return
            } else {
                if(minArr.includes(id)) {
                    return
                }
                inputField.push(id)
            }
            const input = inputField.join('').toString()
            this.setState({
                inputField: input
            })
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
                createCase()
                // try {
                //     await axios.post('/cases.json', this.state.cAse)
                // } catch (e) {
                //     console.log(e)
                // }
        } else {
            if(inputField.length !==0) {
                if(operations.includes(lastSymbol)) {
                    inputField.splice(-1, 1)
                }
                inputField.push(id)
                const input = inputField.join('').toString()
                this.setState({
                    inputField: input,
                    lastOperation: id,
                })
            }
        }
    }

    onChangeInput = (event) => {
        const symbols = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.']
        const value = event.target.value
        console.log(typeof value)
        const symbol = value[value.length-1]
        if(symbols.includes(symbol)) {
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

    async componentDidUpdate() {
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
                        onClickLogClear={this.onLogClearHandler}
                    />
                    : null
                }
                <Keybord
                    onKeyboardClick = {this.onKeyboardHandler}
                />
                {this.props.openConverterDrawer
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
        createCase: () => dispatch(createCase()),
        logDrawer: () => dispatch(logDrawer()),
        converterDrawer: () => dispatch(converterDrawer())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
