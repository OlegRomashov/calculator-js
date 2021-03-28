import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import MeasureBlock from '../MeasureBlock/MeasureBlock'
import MeasurePanel from '../MeasurePanel/MeasurePanel'
import MeasureKeyboard from '../MeasureKeyboard/MeasureKeyboard'
import './Area.css'

class Area extends Component {
    state = {
        inputFieldUP: '',
        inputFieldDown: '',
        block: 'up'
    }

    clearInput = () => {
        this.setState({
            inputFieldUP: '',
            inputFieldDown: ''
        })
    }

    onKeyboardHandler = (id) => {
        if( id === 1) {
            this.clearInput()
        } else if(id === 10) {
            return
        } else {
            const inputFieldUP = [...this.state.inputFieldUP]
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

    changeMeasureInputHandler(){}



    changeSelectHandler(){

    }

    render() {
        return (
            <div className='Area'>
                <div className="title">
                    <NavLink to='/'><span><i className="fas fa-chevron-left"></i></span></NavLink>
                    КОНВЕРТАЦИЯ ЕДИНИЦ
                </div>
                <MeasureBlock
                    block={this.state.block}
                    inputFieldUP={this.state.inputFieldUP}
                    onChangeMeasureInput={this.changeMeasureInputHandler}
                    onChangeSelect={this.changeSelectHandler}
                />
                <MeasureBlock
                    block={this.state.block}
                    inputFieldDown={this.state.inputFieldDown}
                    onChangeMeasureInput={this.onChangeMeasureInput}
                />
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


