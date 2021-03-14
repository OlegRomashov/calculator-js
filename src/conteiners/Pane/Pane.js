import React from 'react'
import PanelButton from "../../components/PanelButton/PanelButton"
import './Pane.css'

const Pane = props => {

    const buttons = [{id: 1, icon: 'ЖУРНАЛ'},
        {id: 2, icon: <i className="fas fa-ruler"></i>},
        {id: 3, icon: <i className="fas fa-backspace"></i>}]

    return (
        <div className={'Pane'}>
            {buttons.map((button, index) => {
                return (
                    <PanelButton
                        key={index}
                        button={button}
                        onClickDrawer={props.onClickDrawer}
                    />
                )
            })}
        </div>
    )
}

export default Pane