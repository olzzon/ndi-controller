import '../styles/ClientPanel.css'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
import { ISource, ITarget } from '../../models/interfaces'

import React, { useEffect, useState } from 'react'
import { socketClient } from './mainPage'

interface IclientPanelProps {
    targetIndex: number
}

const ClientPanel = (props: IclientPanelProps) => {
    const [targets, setTargets] = useState<ITarget[]>([])
    const [sources, setSources] = useState<ISource[]>([])
    const targetIndex = props.targetIndex

    useEffect(() => {
        if (socketClient) {
            socketClient.on(
                IO.UPDATE_CLIENT,
                (sourceList: ISource[], targetList: ITarget[]) => {
                    console.log(
                        'Source List: ',
                        sourceList,
                        'Target List :',
                        targetList
                    )
                    setSources(sourceList)
                    setTargets(targetList)
                }
            )
        }
    }, [socketClient])

    const handleChangeSource = (sourceIndex: number) => {
        socketClient.emit(IO.CHANGE_SOURCE, sourceIndex, targetIndex)
    }

    return (
        <div>
            {targets[targetIndex] ? (
                <React.Fragment>
                    <h1 className={'client-target-label'}>
                        {targets[targetIndex].label}
                    </h1>
                    <div className="client-panel">
                        {sources.map((source: ISource, sourceIndex: number) => {
                            return (
                                <button
                                    key={sourceIndex}
                                    className="client-connection-botton"
                                    onClick={() =>
                                        handleChangeSource(sourceIndex)
                                    }
                                >
                                    {targets[targetIndex].selectedSource ===
                                    sourceIndex ? (
                                        <div className="client-button-label-active">
                                            {source.label}
                                        </div>
                                    ) : (
                                        <div className="client-button-label">
                                            {source.label}
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </React.Fragment>
            ) : (
                <div>LOADING TARGET</div>
            )}
        </div>
    )
}

export default ClientPanel
