import React from 'react'
import './InputField.css'

const InputField = props => {

    return(
        <div className={"InputField"}>
            <input
                type='text'
                value={props.inputField}
                onChange={props.onChangeInput}
            />
        </div>)}

export default InputField
