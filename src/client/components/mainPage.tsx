import '../styles/MainPage.css'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
//@ts-ignore
import logo from '../assets/logo_black.png'

import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Matrix from './matrix'
import SettingsPage from './settings'
import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'

export const socketClient = io()

const MainPage = () => {
    const [showSettings, setShowSettings] = useState<boolean>(false)
    const [targets, setTargets] = useState<ITarget[]>([])
    const [sources, setSources] = useState<ISource[]>([])
    const [discoveredNdiSources, setDiscoveredNdiSources] = useState<
        IDiscoveredNdiSource[]
    >([])

    useEffect(() => {
        socketClient
            .on('connect', () => {
                console.log('Connected to NDI-MTX')
            })
            .on(
                IO.UPDATE_CLIENT,
                (
                    sourceList: ISource[],
                    targetList: ITarget[],
                    discoveredNdiSourcesList: IDiscoveredNdiSource[]
                ) => {
                    console.log(
                        'Source List: ',
                        sourceList,
                        'Target List :',
                        targetList,
                        'Discovered NDI sources :',
                        discoveredNdiSourcesList
                    )
                    setSources(sourceList)
                    setTargets(targetList)
                    setDiscoveredNdiSources(discoveredNdiSourcesList)
                }
            )
    }, [socketClient])

    const handleShowSettings = () => {
        setShowSettings(!showSettings)
    }

    return (
        <div className={'container'}>
            <div className={'header'}>
                <img className={'logo'} src={logo} width="90" height="35" />
                NDI CONTROLLER
            </div>
            {!showSettings ? (
                <React.Fragment>
                    <Matrix sources={sources} targets={targets} />
                    <div className="foot-container">
                        <button
                            className="foot-settings"
                            onClick={() => {
                                handleShowSettings()
                            }}
                        >
                            MTX SETUP
                        </button>
                    </div>
                </React.Fragment>
            ) : (
                <SettingsPage
                    sources={sources}
                    targets={targets}
                    discoveredNdiSources={discoveredNdiSources}
                    setSources={setSources}
                    handleShowSettings={handleShowSettings}
                />
            )}
        </div>
    )
}

export default MainPage
