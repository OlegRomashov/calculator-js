import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import MeasureBlock from '../MeasureBlock/MeasureBlock'
import MeasurePanel from '../MeasurePanel/MeasurePanel'
import MeasureKeyboard from '../MeasureKeyboard/MeasureKeyboard'
import './Area.css'

class Area extends Component {
    state = {
        inputs: [
            {name: 'inputFieldUP', value: '111'},
            {name: 'inputFieldDown', value: '222'}
        ]
    }

    clearInput = () => {
        this.setState({
            inputs: [
                {name: 'inputFieldUP', value: ''},
                {name: 'inputFieldDown', value: ''}
            ]
        })
    }

    onKeyboardHandler = (id) => {
        if( id === 1) {
            this.clearInput()
        } else if(id === 10) {
            return
        } else {
            const inputFieldUP = [...this.state.inputs.inputFieldUP.value]
            inputFieldUP.push(id)
            const inputUP = inputFieldUP.join('')
            const inputDown = inputUP//todo calculate result
            this.setState({
                inputFieldUP: inputUP,
                inputFieldDown: inputDown
            })
        }
    }

    onDeleteSymbolHandler = () => {
        if(this.state.inputFieldUP.length !== 0) {
            const fieldUP = [...this.state.inputFieldUP]
            fieldUP.splice(-1, 1)
            const inputFieldUP = fieldUP.join('')
            const inputFieldDown = inputFieldUP//todo calculate result
            this.setState({
                inputFieldUP: inputFieldUP,
                inputFieldDown: inputFieldDown
            })
        }
    }
    onChangeInput = (event) => {}

    changeMeasureInputHandler = (index, event) => {
        const symbols = [',', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const value = event.target.value
        const symbol = value[value.length-1]
        if(symbols.includes(symbol)) {
            const input = this.state.inputs[index]
            input.value = value
            const inputs = [...this.state.inputs]
            inputs[index] = input
            this.setState({inputs})
        }
        console.log(this.state.inputs)
    }

    changeSelectHandler(){}

    render() {
        const inputs = this.state.inputs
        return (
            <div className='Area'>
                <div className="title">
                    <NavLink to='/'><span><i className="fas fa-chevron-left"></i></span></NavLink>
                    КОНВЕРТАЦИЯ ЕДИНИЦ
                </div>
                {inputs.map((input, index) => {
                    return (
                        <React.Fragment key={index}>
                            <MeasureBlock
                                index={index}
                                inputValue={input.value}
                                onChangeMeasureInput={this.changeMeasureInputHandler}
                                onChangeSelect={this.changeSelectHandler}
                            />
                        </React.Fragment>
                    )
                })}
                <MeasurePanel
                    onDeleteSymbol = {this.onDeleteSymbolHandler}
                />
                <MeasureKeyboard
                    onKeyboardClick = {this.onKeyboardHandler}
                />
            </div>
        )
    }

}

export default Area


