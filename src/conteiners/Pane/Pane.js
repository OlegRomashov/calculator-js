import React from 'react'
import PanelButton from "../../components/PanelButton/PanelButton"
import './Pane.css'

const Pane = props => {
    return (
        <div className={'Pane'}>
            <PanelButton
                id={1}
                onClickDrawer={props.onClickDrawer}
                disabled={!props.casesLength}
            >{props.openLogDrawer === false
              ? 'ЖУРНАЛ'
              : 'КЛАВИАТУРА'
            }
                </PanelButton>
            <PanelButton
                id={2}
                onClickDrawer={props.onClickDrawer}
            ><i className="fas fa-ruler"></i></PanelButton>
            <PanelButton />
            <PanelButton
                id={3}
                onClickDrawer={props.onClickDrawer}
            ><i className="fas fa-backspace"></i></PanelButton>
        </div>
    )
}

export default Pane