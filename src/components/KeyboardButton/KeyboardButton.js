import React from 'react'
import './KeyboardButton.css'


const KeyboardButton = props => (
    <button
        className={'KeyboardButton'}
        onClick={() => props.onKeyboardClick(props.button.id, props.button.text)}
    >
        {props.button.text}
    </button>
)

export default KeyboardButton