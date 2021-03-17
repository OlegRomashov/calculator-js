import React from 'react'
import InputField from '../../components/InputField/InputField'
import ResultField from '../../components/ResultField/ResultField'
import './Scoreboard.css'

const Scoreboard = props => (
            <div className={'Scoreboard'}>
                <InputField
                    inputField={props.inputField}
                    onChangeInput={props.onChangeInput}
                />
                <ResultField
                    resultField={props.resultField}
                />
            </div>
        )

export default Scoreboard