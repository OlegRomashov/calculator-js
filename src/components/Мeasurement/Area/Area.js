import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import MeasureBlock from '../MeasureBlock/MeasureBlock'
import MeasurePanel from '../MeasurePanel/MeasurePanel'
import MeasureKeyboard from '../MeasureKeyboard/MeasureKeyboard'
import './Area.css'

class Area extends Component {
    state = {
        inputFieldUP: '5',
        inputFieldDown: '',
        block: 'up'
    }

    onKeyboardHandler = (id) => {
        console.log(id)
    }
    onChangeInput = (event) => {}
    onDeleteSymbolHandler
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
                <MeasurePanel/>
                <MeasureKeyboard
                    onKeyboardClick = {this.onKeyboardHandler}
                />
            </div>
        )
    }

}

export default Area


