import React from 'react'
import './ResultField.css'

const ResultField = props => (
    <div className="ResultField">
        <div className="result" id="result">
            {props.resultField}
        </div>
    </div>
)

export default ResultField