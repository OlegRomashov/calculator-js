import React from 'react'
import './MeasureButton.css'

const MeasureButton = props => (
    <button
        className="MeasureButton"
        onClick={() => props.onKeyboardClick(props.button.id, props.button.text)}
    >
        {props.button.text}
    </button>
)

export default MeasureButton