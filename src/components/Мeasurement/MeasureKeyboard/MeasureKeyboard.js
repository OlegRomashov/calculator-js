import React from 'react'
import MeasureButton from '../MeasureButton/MeasureButton'
import './MeasureKeyboard.css'


const buttons12 = [
    {id: 7, text: '7'}, {id: 8, text: '8'}, {id: 9, text: '9'}, {id: 4, text: '4'}, {id: 5, text: '5'},
    {id: 6, text: '6'}, {id: 1, text: '1'}, {id: 2, text: '2'}, {id: 3, text: '3'}, {id: 10, text: '+/-'},
    {id: 0, text: '0'}, {id: 11, text: ','}
    ]

const buttons3 = [{id: 12, text: 'C'}, {id: 13, text: <i className="fas fa-arrow-up"></i>},
    {id: 14, text: <i className="fas fa-arrow-down"></i>}]

const MeasureKeyboard = props => (
    <div className="MeasureKeyboard">
        {buttons12.map((button, index) => {
            return (
                <MeasureButton
                    key={index}
                    button={button}
                    onKeyboardClick={props.onKeyboardClick}
                    />
            )
        })}
            <div className="right">
                {buttons3.map((button, index) => {
                    return (
                        <MeasureButton
                            key={index}
                            button={button}
                            onKeyboardClick={props.onKeyboardClick}
                        />
                    )
                })}
            </div>
        </div>
)

export default MeasureKeyboard