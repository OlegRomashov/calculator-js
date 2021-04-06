import React from 'react'
import './PanelButton.css'

const PanelButton = props => {
        return(
            <button
                    // id={props.id}
                    className={'PanelButton'}
                    onClick={() => props.onClickDrawer(props.id)}
                    disabled={props.disabled}
            >
                    {props.children}
            </button>
        )
}

export default PanelButton