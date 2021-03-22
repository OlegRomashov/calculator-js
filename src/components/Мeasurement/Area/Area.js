import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import MeasureBlock from '../MeasureBlock/MeasureBlock'
import MeasurePanel from '../MeasurePanel/MeasurePanel'
import MeasureKeyboard from '../MeasureKeyboard/MeasureKeyboard'
import './Area.css'

class Area extends Component {
    state = {
        counter: null,
        cursor: 'up'
    }

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
                    onChangeMeasureInput={this.changeMeasureInputHandler}
                    onChangeSelect={this.changeSelectHandler}
                />
                <MeasureBlock
                    onChangeMeasureInput={this.onChangeMeasureInput}
                />
                <MeasurePanel/>
                <MeasureKeyboard/>
            </div>
        )
    }

}

export default Area


