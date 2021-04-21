import React, {Component} from 'react'
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
    exampleToInput,
    closeBackDrop,
    keyboard,
    onClickDrawer,
    changeInput
} from '../../store/actions/actionCalc'

class Calculator extends Component {
    componentDidMount() {
        this.props.fetchExamples()
    }
    
    render() {
        return (
            <div className={'Calculator'}>
                <Scoreboard
                    inputField={this.props.inputField}
                    resultField={this.props.resultField}
                    onChangeInput={this.props.changeInput}
                />
                <Pane
                    onClickDrawer={this.props.onClickDrawer}
                    openLogDrawer={this.props.openLogDrawer}
                    casesLength={this.props.cases.length}
                    inputFieldLength={this.props.inputField}
                />
                {this.props.openLogDrawer
                    ? <Log
                        cases={this.props.cases}
                        onClickExample={this.props.exampleToInput}
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
        exampleToInput: (index) => dispatch(exampleToInput(index)),
        closeBackDrop: () => dispatch(closeBackDrop()),
        keyboard: (id) => dispatch(keyboard(id)),
        onClickDrawer: (id) => dispatch(onClickDrawer(id)),
        changeInput: (event) => dispatch(changeInput(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
