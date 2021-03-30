import React, {Component} from 'react'
import './MeasureInput.css'

class MeasureInput extends Component {

    render() {
        return(
            <div className='MeasureInput'>
                <input
                    // ref={props.ref}
                    type="text"
                    value={this.props.inputValue}
                    onChange={this.props.onChangeMeasureInput.bind(null, this.props.index)}
                    // defaultValue='1'

                />
                <span>
            <span id="section2">
             ac
            </span>
            <span id="section3" style={{display: 'none'}}>
                a
            </span>
            <span id="section4" style={{display: 'none'}}>
                ha
            </span>
            <span id="section5" style={{display: 'none'}}>
                cm2
            </span>
            <span id="section6" style={{display: 'none'}}>
                ft2
            </span>
            <span id="section7" style={{display: 'none'}}>
                in2
            </span>
            <span id="section8" style={{display: 'none'}}>
                m2
            </span>
        </span>
            </div>
        )
    }
}

export default MeasureInput