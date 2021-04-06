import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import MeasureBlock from '../MeasureBlock/MeasureBlock'
import MeasurePanel from '../MeasurePanel/MeasurePanel'
import MeasureKeyboard from '../MeasureKeyboard/MeasureKeyboard'
import './Area.css'

class Area extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputs: [
                {name: 'inputFieldUP', value: ''},
                {name: 'inputFieldDown', value: ''}
            ],
            indexBlock: 0,
            upSelect: 'ac',
            downSelect: 'ac',
            coefficient: '1'
        }
    }

    clearInput = () => {
        let inputs = [...this.state.inputs]
        const input0 = inputs[0]
        const input1 = inputs[1]
        input0.value = ''
        input1.value = ''
        this.setState({inputs})
    }

    onKeyboardHandler = (id) => {
        const indexBlock = this.state.indexBlock
        const inputs = [...this.state.inputs]
        const inputFocus = inputs[indexBlock]
        const inputNoFocus = inputs[1 - indexBlock]
        const coefficient = this.state.coefficient

        if( id === 12) {
            this.clearInput()
        } else if(id === 10) {
            return
        } else if(id === 13) {
            this.setState({
                indexBlock: 0
        })} else if(id === 14) {
            this.setState({
                indexBlock: 1
        })} else if(id === ',') {
                if(inputFocus.value.length === 0) {
                    inputFocus.value = '0,'
                    inputNoFocus.value = '0,'
                    inputs[indexBlock] = inputFocus
                    inputs[1-indexBlock] = inputNoFocus
                    this.setState({inputs})
                } else if (inputFocus.value.includes(',')) {
                    return
                } else {
                    inputFocus.value = inputFocus.value + id.toString()
                    inputNoFocus.value = (+inputFocus.value * coefficient).toString()
                    inputs[indexBlock] = inputFocus
                    inputs[1-indexBlock] = inputNoFocus
                    this.setState({inputs})
                }
        } else if(id === 0) {
            if(inputFocus.value === '0') {
               return
            } else {
                inputFocus.value = inputFocus.value + id.toString()
                inputNoFocus.value = (+inputFocus.value * coefficient).toString()
                inputs[indexBlock] = inputFocus
                inputs[1-indexBlock] = inputNoFocus
                this.setState({inputs})
            }
        } else {
            if(inputFocus.value === '0') {
                inputFocus.value = id.toString()
                inputNoFocus.value = (+inputFocus.value * coefficient).toString()
                inputs[indexBlock] = inputFocus
                inputs[1-indexBlock] = inputNoFocus
                this.setState({inputs})
            }
            inputFocus.value = inputFocus.value + id.toString()
            inputNoFocus.value = (+inputFocus.value * coefficient).toString()
            inputs[indexBlock] = inputFocus
            inputs[1-indexBlock] = inputNoFocus
            this.setState({inputs})
        }
    }

    onDeleteSymbolHandler = () => {
        const indexBlock = this.state.indexBlock
        const inputs = [...this.state.inputs]
        const inputFocus = inputs[indexBlock]
        const inputNoFocus = inputs[1 - indexBlock]
        const coefficient = this.state.coefficient
        const value = (Array.from(inputFocus.value))
              value.splice(-1, 1)
              inputFocus.value = value.join('')
              inputNoFocus.value = (+inputFocus.value * coefficient).toString()
              inputs[indexBlock] = inputFocus
              inputs[1 - indexBlock] = inputNoFocus
              this.setState({inputs})
    }

    changeMeasureInputHandler = (index, event) => {
        const symbols = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const value = event.target.value
        const symbol = value[value.length-1]

        if(symbols.includes(symbol)) {
            const inputs = [...this.state.inputs]
            const coefficient = this.state.coefficient
            const inputFocus = {...inputs[index]}
            const inputNoFocus = {...inputs[1 - index]}
            inputFocus.value = value
            inputNoFocus.value = (+inputFocus.value * coefficient).toString()
            inputs[index] = inputFocus
            inputs[1 - index] = inputNoFocus
            this.setState({inputs})
        }
    }

    changeSelectHandler = (index, select) => {
        const value = select.target.value
        const inputs = [...this.state.inputs]
        const inputUp = inputs[0]
        const inputDown = inputs[1]
        const measureTable = {
            'ac-ac': '1', 'ac-a': '40.468', 'ac-ha': '0.404', 'ac-cm2': '40468564.224', 'ac-ft2': '43560',  'ac-in2': '6272640', 'ac-m2': '4046.856',
            'a-ac': '0.024', 'a-a': '1', 'a-ha': '0.01', 'a-cm2': '1000000', 'a-f2': '1076.391', 'a-in2': '155000.310', 'a-m2': '100',
            'ha-ac': '2.471', 'ha-a': '100', 'ha-ha': '1', 'ha-cm2': '100000000', 'ha-ft2': '107639.104', 'ha-in2': '15500031', 'ha-m2': '10000',
            'cm2-ac': '2.471', 'cm2-a': '0.000001', 'cm2-ha': '0.0000001', 'cm2-cm2': '1', 'cm2-ft2': '0.001', 'cm2-in2': '0.155', 'cm2-m2': '0.0001',
            'ft2-ac': '0.00000229', 'ft2-a': '0.000092', 'ft2-ha': '0.000009', 'ft2-cm2': '929.03', 'ft2-ft2': '1', 'ft2-in2': '144', 'ft2-m2': '0.092',
            'in2-ac': '1.594', 'in2-a': '0.000006', 'in2-ha': '0.00000006', 'in2-cm2': '6.451', 'in2-ft2': '0.006', 'in2-in2': '1', 'in2-m2': '0.0006',
            'm2-ac': '0.0002', 'm2-a': '0.01', 'm2-ha': '0.0001', 'm2-cm2': '10000', 'm2-ft2': '10.763', 'm2-in2': '1550.003', 'm2-m2': '1'
        }

        if(index === 0) {
            this.setState({upSelect: value})
            const measure = value + '-' + this.state.downSelect
            const coefficient = parseFloat(measureTable[measure])
                  inputDown.value = (+inputUp.value * coefficient).toString()
                  inputs[1] = inputDown
            this.setState({inputs, coefficient})
        } else if(index === 1) {
            this.setState({downSelect: value})
            const measure = this.state.upSelect + '-' + value
            const coefficient = parseFloat(measureTable[measure])
                  inputDown.value = (+inputUp.value * coefficient).toString()
                  inputs[1] = inputDown
            this.setState({inputs, coefficient})
        }
    }

    render() {
        const inputs = this.state.inputs
        return (
            <div className='Area'>
                <div className="title">
                    <NavLink to='/'><span><i className="fas fa-chevron-left"></i></span></NavLink>
                    КОНВЕРТАЦИЯ ЕДИНИЦ
                </div>
                {inputs.map((input, index) => {
                    return (
                        <React.Fragment key={index}>
                            <MeasureBlock
                                index={index}
                                indexBlock={this.state.indexBlock}
                                inputValue={input.value}
                                upSelect={this.state.upSelect}
                                downSelect={this.state.downSelect}
                                onChangeMeasureInput={this.changeMeasureInputHandler}
                                onChangeSelect={this.changeSelectHandler}
                            />
                        </React.Fragment>
                    )
                })}
                <MeasurePanel
                    onDeleteSymbol = {this.onDeleteSymbolHandler}
                />
                <MeasureKeyboard
                    onKeyboardClick = {this.onKeyboardHandler}
                />
            </div>
        )
    }

}

export default Area


