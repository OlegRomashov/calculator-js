import React from 'react'
import './Keyboard.css'
import KeyboardButton from '../../components/KeyboardButton/KeyboardButton'

const buttons =  [
    {id: 'C', text: 'C'}, {id: 11, text: '()'}, {id: 12, text: '%'}, {id: '/', text: '/'}, {id: 7, text: '7'},
    {id: 8, text: '8'}, {id: 9, text: '9'}, {id: '*', text: 'x'}, {id: 4, text: '4'}, {id: 5, text: '5'},
    {id: 6, text: '6'},  {id: '-', text: '-'}, {id: 1, text: '1'}, {id: 2, text: '2'}, {id: 3, text: '3'},
    {id: 10, text: '+'}, {id: 13, text: '+/-'},  {id: 0, text: '0'}, {id: ',', text: ','}, {id: 14, text: '='}
]

const Keyboard = props => {
        return(
            <div className={'Keyboard'}>
                {buttons.map((button, index) => {
                    return (
                        <KeyboardButton
                            key={index}
                            button={button}
                            onKeyboardClick = {props.onKeyboardClick}
                        />
                    )
                })}
            </div>
        )
}

export default Keyboard