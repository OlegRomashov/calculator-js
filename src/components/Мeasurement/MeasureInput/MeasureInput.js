import React from 'react'
import './MeasureInput.css'

const MeasureInput = props => (
    <div className='MeasureInput'>
        <input
            type="text"
            onChange={props.onChangeMeasureInput}
            defaultValue='1'
        />
        <span>ga</span>
    </div>
)

export default MeasureInput