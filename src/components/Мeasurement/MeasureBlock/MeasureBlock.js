import React, {Component} from 'react'
import './MeasureBlock.css'
import MeasureInput from '../MeasureInput/MeasureInput'
import MeasureSelect from '../MeasureSelect/MeasureSelect'

class MeasureBlock extends Component{

    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        if (this.props.index === 1) {
            // this.inputRef.current.focus()
        }
    }

    render() {
        return (
            <div className="MeasureBlock">
                <MeasureSelect
                    selectionHandler={this.props.onChangeSelect}
                />
                <MeasureInput
                    ref={this.inputRef}
                    index={this.props.index}
                    inputValue={this.props.inputValue}
                    onChangeMeasureInput={this.props.onChangeMeasureInput}
                />
            </div>
        )
    }
}

export default MeasureBlock