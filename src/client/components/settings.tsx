import React, { useState } from 'react'
import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'
import '../styles/Settings.css'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
import { socketClient } from './mainPage'
import SettingsSourcePopUp from './settingsSourcePopUp'

interface ISettingsProps {
    sources: ISource[]
    targets: ITarget[]
    discoveredNdiSources: IDiscoveredNdiSource[]
    setSources: React.Dispatch<React.SetStateAction<ISource[]>>
    handleShowSettings(): void
}

const SettingsPage: React.FC<ISettingsProps> = (props) => {
    const [selectedSource, setSelectedSource] = useState<number>(-1)

    const handleSaveSettings = () => {
        socketClient.emit(IO.SAVE_SOURCES_LIST, props.sources)
        props.handleShowSettings()
    }

    const handleCancelSettings = () => {
        props.handleShowSettings()
    }

    const handleSettingsSourcePopup = (sourceIndex: number) => {
        setSelectedSource(sourceIndex)
    }

    const renderSourceList = () => {
        const selectSourceIndexDummy = 1
        return (
            <div className="settings-list">
                <div className="settings-item">Sources :</div>
                {props.sources.map((source, sourceIndex) => {
                    return (
                        <button
                            key={sourceIndex}
                            onClick={() => {
                                handleSettingsSourcePopup(sourceIndex)
                            }}
                            className="settings-item"
                        >
                            {source.label}
                        </button>
                    )
                })}
            </div>
        )
    }

    const renderTargetList = () => {
        return (
            <div className="settings-list">
                <div className="settings-item">Targets :</div>
                {props.targets.map((target, targetIndex) => {
                    return (
                        <div key={targetIndex} className="settings-item">
                            {target.label}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={'settings'}>
            {renderSourceList()}
            {renderTargetList()}
            <button
                onClick={() => {
                    handleCancelSettings()
                }}
            >
                CANCEL
            </button>
            <button
                onClick={() => {
                    handleSaveSettings()
                }}
            >
                UPDATE
            </button>
            {selectedSource === -1 ? (
                <React.Fragment />
            ) : (
                <SettingsSourcePopUp
                    sources={props.sources}
                    setSources={props.setSources}
                    discoveredNdiSources={props.discoveredNdiSources}
                    selectedPopUp={selectedSource}
                    setSelectedPopUp={setSelectedSource}
                />
            )}
        </div>
    )
}

export default SettingsPage
