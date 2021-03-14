import React from 'react'
import './BackDrop.css'

const BackDrop = props => {
    return (
        <div className="BackDrop"
            onClick={props.onCloseBackDrop}
        >

        </div>
    )
}

export default BackDrop