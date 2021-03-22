import React from 'react'
import './MeasureBlock.css'
import MeasureInput from '../MeasureInput/MeasureInput'
import MeasureSelect from '../MeasureSelect/MeasureSelect'

const MeasureBlock = props => (
    <div className="MeasureBlock">

        <MeasureSelect />
        <MeasureInput
            onChangeMeasureInput={props.onChangeMeasureInput}
        />
    </div>
)

export default MeasureBlock