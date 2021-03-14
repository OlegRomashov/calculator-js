import React from 'react'
import './UnitOfMeasure.css'

const UnitOfMeasure = props => {
    return(
    <div
        className="UnitOfMeasure"
        // onClick={() => props.onClickUnit(props.unit.id)}
    >
        {props.unit.icon}<br/>
        <span>{props.unit.label}</span>
    </div>
)}

export default UnitOfMeasure