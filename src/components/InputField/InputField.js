import React from 'react'
import './InputField.css'

const InputField = props => {

    return(
        <div className={"InputField"}>
            <div
                id='input'
                className='input'
            >{props.inputField}</div>
        </div>)}

export default InputField
