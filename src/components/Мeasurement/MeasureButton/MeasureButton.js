import React from 'react'
import './MeasureButton.css'

const MeasureButton = props => (
    <button className="MeasureButton">
        {props.button.text}
    </button>
)

export default MeasureButton