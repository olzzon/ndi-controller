import '../styles/MainPage.css'
import * as IO from '../../models/SOCKET_IO_CONTANTS'

import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Matrix from './matrix'
import SettingsPage from './settings'
import { INetWorkSource, ISource, ITarget } from '../../models/interfaces'

export const socketClient = io()

const MainPage = () => {
    const [serverOnline, setServerOnline] = useState<boolean>(false)
    const [showSettings, setShowSettings] = useState<boolean>(false)
    const [targets, setTargets] = useState<ITarget[]>([])
    const [sources, setSources] = useState<ISource[]>([])
    const [networkSources, setNetworkSources] = useState<INetWorkSource[]>([])


    useEffect(() => {
        socketClient
            .on('connect', () => {
                setServerOnline(true)
                console.log('Connected to NDI-MTX')
            })
            .on('disconnect', () => {
                setServerOnline(false)
            })

        if (socketClient) {
            socketClient.on(
                IO.UPDATE_CLIENT,
                (sourceList: ISource[], targetList: ITarget[], networkSourcesList: INetWorkSource[]) => {
                    console.log(
                        'Source List: ',
                        sourceList,
                        'Target List :',
                        targetList
                    )
                    setSources(sourceList)
                    setTargets(targetList)
                    setNetworkSources(networkSourcesList)
                }
            )
        }
    }, [socketClient])

    const handleRestartServer = () => {
        if (window.confirm('Are you sure you will restart server ')) {
            console.log('RESTARTING SERVER')
            socketClient.emit(IO.RESTART_SERVER)
        }
    }

    const handleShowSettings = () => {
        setShowSettings(!showSettings)
    }

    return (
        <React.Fragment>
            <div className={'container'}>
                <div className={'header'}>NDI CONTROLLER</div>
                <div className="buttons">
                    <button
                        className={'button'}
                        onClick={() => {
                            handleRestartServer()
                        }}
                    >
                        {serverOnline ? (
                            <React.Fragment>SERVER ONLINE</React.Fragment>
                        ) : (
                            <React.Fragment>SERVER OFFLINE</React.Fragment>
                        )}
                    </button>
                    <button
                        className="button"
                        onClick={() => {
                            handleShowSettings()
                        }}
                    >
                        SETTINGS
                    </button>
                </div>
            </div>
            {!showSettings ? (
                <Matrix sources={sources} targets={targets} />
            ) : (
                <SettingsPage sources={sources} targets={targets} networkSources={networkSources} setSources={setSources}/>
            )}
        </React.Fragment>
    )
}

export default MainPage
