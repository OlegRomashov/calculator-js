import React, {Component} from 'react'
import './MeasureInput.css'

class MeasureInput extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        if(this.props.index === this.props.indexBlock) {
            this.inputRef.current.focus()
        }
    }

    componentDidUpdate() {
        if(this.props.index === this.props.indexBlock) {
            this.inputRef.current.focus()
        }
    }

    render() {
        return(
            <div className='MeasureInput'>
                <input
                    ref = {this.inputRef}
                    type="text"
                    value={this.props.inputValue}
                    onChange={this.props.onChangeMeasureInput.bind(null, this.props.index)}
                    placeholder='1'
                />
                <span>
                    { this.props.index === 0
                      ? this.props.upSelect
                      : this.props.downSelect
                    }
                </span>
            </div>
        )
    }
}

export default MeasureInput