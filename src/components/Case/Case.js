import React from 'react'
import './Case.css'

const Case = props => {
    return(
    <div
        className={'Case'}
        onClick={() => props.onClickExample(props.example.id)}
    >
        {props.example.field}<br/>
         <div className={'Equally'}>={props.example.equally}</div>
        <hr/>
    </div>
)}

export default Case