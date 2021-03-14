import React from 'react'
import './ClearLog.css'

const ClearLog = props => {
    return(
    <div className={'ClearLog'}>
        <button
            onClick={() => props.onClickLogClear()}
        >ОЧИСТИТЬ ЖУРНАЛ</button>
    </div>
)}

export default ClearLog