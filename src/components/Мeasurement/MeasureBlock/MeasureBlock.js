import React, {Component} from 'react'
import './MeasureBlock.css'
import MeasureInput from '../MeasureInput/MeasureInput'
import MeasureSelect from '../MeasureSelect/MeasureSelect'

class MeasureBlock extends Component{

    render() {
        return (
            <div className="MeasureBlock">
                <MeasureSelect
                    index={this.props.index}
                    selectionHandler={this.props.onChangeSelect}
                />
                <MeasureInput
                    index={this.props.index}
                    indexBlock={this.props.indexBlock}
                    inputValue={this.props.inputValue}
                    onChangeMeasureInput={this.props.onChangeMeasureInput}
                />
            </div>
        )
    }
}

export default MeasureBlock