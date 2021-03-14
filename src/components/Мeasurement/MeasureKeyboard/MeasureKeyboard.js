import React from 'react'
import MeasureButton from '../MeasureButton/MeasureButton'
import './MeasureKeyboard.css'


const buttons12 = [
    {id: 1, text: '7'}, {id: 2, text: '8'}, {id: 3, text: '9'}, {id: 4, text: '4'}, {id: 5, text: '5'},
    {id: 6, text: '6'}, {id: 7, text: '1'}, {id: 8, text: '2'}, {id: 9, text: '3'}, {id: 10, text: '+/-'},
    {id: 11, text: '0'}, {id: 12, text: ','}
    ]

const buttons3 = [{id: 1, text: 'C'}, {id: 2, text: <i className="fas fa-arrow-up"></i>},
    {id: 3, text: <i className="fas fa-arrow-down"></i>}]

const MeasureKeyboard = props => (
    <div className="MeasureKeyboard">
        {buttons12.map((button, index) => {
            return (
                <MeasureButton
                    key={index}
                    button={button}
                    />
            )
        })}
            <div className="right">
                {buttons3.map((button, index) => {
                    return (
                        <MeasureButton
                            key={index}
                            button={button}
                        />
                    )
                })}
            </div>
        </div>
)

export default MeasureKeyboard