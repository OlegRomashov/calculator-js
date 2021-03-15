import React from 'react'
import './InputField.css'

const InputField = props => {

    return(
        <div className={"InputField"}>
            <input
                defaultValue={props.inputField}
            />
        </div>)}

export default InputField
