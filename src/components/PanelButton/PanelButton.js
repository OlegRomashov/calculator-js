import React from 'react'
import './PanelButton.css'

const PanelButton = props => {
        return(
            <button className={'PanelButton'}
                    onClick={() => props.onClickDrawer(props.button.id)}
            >
                    {props.button.icon}
            </button>
        )
}

export default PanelButton