import React from 'react'
import './Log.css'
import Case from '../../components/Case/Case'
import ClearLog from "../../components/ClearLog/ClearLog"

const Log = props => {

    return(
    <div className={'Log'}>
        <div className={'Example'}>
                    {props.cases.map((example, index) => {
                        return (
                            <Case
                                key={index}
                                example={example}
                                onClickExample={props.onClickExample}
                            />
                        )
                    })}
        </div>
        <ClearLog
            onClickLogClear={props.onClickLogClear}
        />
    </div>
)}

export default Log