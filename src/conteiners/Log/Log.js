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
                        <React.Fragment key={index}>
                            <Case
                                index={index}
                                example={example}
                                onClickExample={props.onClickExample}
                            />
                        </React.Fragment>
                        )
                    })}
        </div>
        <ClearLog
            onClickLogClear={props.onClickLogClear}
        />
    </div>
)}

export default Log