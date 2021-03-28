import React from 'react'
import './MeasurePanel.css'
import {NavLink} from 'react-router-dom'

const MeasurePanel = props => (
    <div className="MeasurePanel">
        <NavLink
            to={'/converter'}
        >
            <i className='fas fa-square-full'></i>
        </NavLink>

        <i className="fas fa-backspace"
            onClick={props.onDeleteSymbol}
        ></i>
    </div>
)

export default MeasurePanel