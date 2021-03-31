import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import MeasureBlock from '../MeasureBlock/MeasureBlock'
import MeasurePanel from '../MeasurePanel/MeasurePanel'
import MeasureKeyboard from '../MeasureKeyboard/MeasureKeyboard'
import './Area.css'

class Area extends Component {
    state = {
        inputs: [
            {name: 'inputFieldUP', value: ''},
            {name: 'inputFieldDown', value: ''}
        ],
        indexBlock: 1
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
        const indexBlock = this.state.indexBlock

        if( id === 12) {
            this.clearInput()
        } else if(id === 10) {
            return
        } else if(id === 13) {
            this.setState({
                indexBlock: 0
        })} else if(id === 14) {
            this.setState({
                indexBlock: 1
            })} else {
        const inputs = [...this.state.inputs]
        const input = inputs[indexBlock]
              input.value = input.value + id.toString()
        this.setState({inputs})
        }
    }

    onDeleteSymbolHandler = () => {
        const indexBlock = this.state.indexBlock
        const inputs = [...this.state.inputs]
        const input = inputs[indexBlock]
        const value = (Array.from(input.value))
              value.splice(-1, 1)
              input.value = value.join('')
              inputs[indexBlock] = input
              this.setState({inputs})
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
                                indexBlock={this.state.indexBlock}
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


