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
                    <span id={'section2'+this.props.index}>
                     ac
                    </span>
                    <span id={'section3'+this.props.index} style={{display: 'none'}}>
                        a
                    </span>
                    <span id={'section4'+this.props.index} style={{display: 'none'}}>
                        ha
                    </span>
                    <span id={'section5'+this.props.index} style={{display: 'none'}}>
                        cm2
                    </span>
                    <span id={'section6'+this.props.index} style={{display: 'none'}}>
                        ft2
                    </span>
                    <span id={'section7'+this.props.index} style={{display: 'none'}}>
                        in2
                    </span>
                    <span id={'section8'+this.props.index} style={{display: 'none'}}>
                        m2
                    </span>
                </span>
            </div>
        )
    }
}

export default MeasureInput