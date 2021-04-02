import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import MeasureBlock from '../MeasureBlock/MeasureBlock'
import MeasurePanel from '../MeasurePanel/MeasurePanel'
import MeasureKeyboard from '../MeasureKeyboard/MeasureKeyboard'
import './Area.css'

class Area extends Component {
    state = {
        inputs: [
            {name: 'inputFieldUP', value: 1},
            {name: 'inputFieldDown', value: 2}
        ],
        indexBlock: 0,
        upSelect: 'ac',
        downSelect: 'ac'
    }



    clearInput = () => {
        this.setState({
            inputs: [
                {name: 'inputFieldUP', value: ''},
                {name: 'inputFieldDown', value: ''}
            ]
        })
    }

    onKeyboardHandler = (id) => {
        const indexBlock = this.state.indexBlock
        const inputs = [...this.state.inputs]
        const input = inputs[indexBlock]
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
                if(input.value.length === 0) {
                    input.value = '0,'
                    this.setState({inputs})
                } else if (input.value.includes(',')) {
                    return
                } else {
                    input.value = input.value + id.toString()
                    this.setState({inputs})
                }
        } else if(id === 0) {
            if(input.value === '0') {
               return
            } else {
                input.value = input.value + id.toString()
                this.setState({inputs})
            }
        } else {
            if(input.value === '0') {
                input.value = id.toString()
                this.setState({inputs})
            }
            input.value = input.value + id.toString()
            this.setState({inputs})
        }
    }

    onDeleteSymbolHandler = () => {
        const indexBlock = this.state.indexBlock
        const inputs = [...this.state.inputs]
        const input = inputs[indexBlock]
        const value = (Array.from(input.value))
              value.splice(-1, 1)
              input.value = value.join('')
              inputs[indexBlock] = input
              this.setState({inputs})
    }

    onChangeInput = (event) => {}

    changeMeasureInputHandler = (index, event) => {
        const symbols = [',', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

        const value = event.target.value
        const symbol = value[value.length-1]
        if(symbols.includes(symbol)) {
            const inputs = [...this.state.inputs]
            const input = inputs[index]
            input.value = value
            inputs[index] = input
            this.setState({inputs})
        }

    }

    changeSelectHandler = (index, select) => {

        const value = select.target.value

        if(index === 0) {
            const upSelect = value
            this.setState({upSelect})
            console.log(upSelect, this.state.upSelect)
        } else if(index === 1) {
            const downSelect = value
            this.setState({downSelect})
            console.log(downSelect, this.state.downSelect)
        }

        const measureTable = {
            'ac-ac': '1', 'ac-a': '40.468', 'ac-ha': '0.404', 'ac-cm2': '40468564.224', 'ac-ft2': '43560',  'ac-in2': '6272640', 'ac-m2': '4046.856',
            'a-ac': '0.024', 'a-a': '1', 'a-ha': '0.01', 'a-cm2': '1000000', 'a-f2': '1076.391', 'a-in2': '155000.310', 'a-m2': '100',
            'ha-ac': '2.471', 'ha-a': '100', 'ha-ha': '1', 'ha-cm2': '100000000', 'ha-ft2': '107639.104', 'ha-in2': '15500031', 'ha-m2': '10000',
            'cm2-ac': '2.471', 'cm2-a': '0.000001', 'cm2-ha': '0.0000001', 'cm2-cm2': '1', 'cm2-ft2': '0.001', 'cm2-in2': '0.155', 'cm2-m2': '0.0001',
            'ft2-ac': '0.00000229', 'ft2-a': '0.000092', 'ft2-ha': '0.000009', 'ft2-cm2': '929.03', 'ft2-ft2': '1', 'ft2-in2': '144', 'ft2-m2': '0.092',
            'in2-ac': '1.594', 'in2-a': '0.000006', 'in2-ha': '0.00000006', 'in2-cm2': '6.451', 'in2-ft2': '0.006', 'in2-in2': '1', 'in2-m2': '0.0006',
            'm2-ac': '0.0002', 'm2-a': '0.01', 'm2-ha': '0.0001', 'm2-cm2': '10000', 'm2-ft2': '10.763', 'm2-in2': '1550.003', 'm2-m2': '1'
        }
        const measure = this.state.upSelect + '-' + this.state.downSelect
        const coefficient = parseFloat(measureTable[measure])

           // const {input1, input2} = this.state.inputs ниже замена
        // const input1 = inputs[0]
        // const input2 = inputs[1]
        // if(index === 0) {
        //     if(input2.value !== ''){
        //         input2.value = input2.value * coefficient
        //         inputs[1] = input2
        //         this.setState({inputs})
        //     }
        // } else if(index === 1) {
        //     if(input1.value !== ''){
        //         input1.value = input1.value * coefficient
        //         inputs[0] = input1
        //         this.setState({inputs})
        //     }
        // }


        // console.log('index:', index)
        // console.log('value:', value)
        // console.log('measure:', measure)
        // console.log('type of coefficient:', coefficient)
        // console.log('state:', this.state)
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


