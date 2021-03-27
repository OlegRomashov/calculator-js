import React from 'react'
import './MeasureBlock.css'
import MeasureInput from '../MeasureInput/MeasureInput'
import MeasureSelect from '../MeasureSelect/MeasureSelect'

const MeasureBlock = props => {

    return (
    <div className="MeasureBlock">

        <MeasureSelect
            selectionHandler={props.onChangeSelect}
        />
        <MeasureInput
            inputFieldUP={props.inputFieldUP}
            inputFieldDown={props.inputFieldDown}
            onChangeMeasureInput={props.onChangeMeasureInput}
        />
    </div>
)}

export default MeasureBlock