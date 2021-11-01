import React, { useEffect, useState } from 'react'
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
    const [selectedSourceIndex, setselectedSourceIndex] = useState<number>(-1)
    const [settingsSources, setSettingsSources] = useState<ISource[]>(props.sources)

    const handleSaveSettings = () => {
        socketClient.emit(IO.SAVE_SOURCES_LIST, settingsSources)
        props.handleShowSettings()
    }

    const handleCancelSettings = () => {
        props.handleShowSettings()
    }

    const handleSettingsSourcePopup = (sourceIndex: number) => {
        setselectedSourceIndex(sourceIndex)
    }

    const handleAddSource = () => {
        let newSources = [...settingsSources]
        newSources.push({label: '', dnsName: '', url: ''})
        setSettingsSources(newSources)
        setselectedSourceIndex(settingsSources.length - 1)
    }


    const handleRemoveSource = (sourceIndex: number) => {
        let newSources = [...settingsSources]
        newSources.splice(sourceIndex, 1)
        setSettingsSources(newSources)
    }


    const renderSourceList = () => {
        const selectSourceIndexDummy = 1
        return (
            <div className="settings-list">
                <div className="settings-item">Sources :</div>
                {settingsSources.map((source, sourceIndex) => {
                    return (
                        <div>
                        <button
                            key={sourceIndex}
                            onClick={() => {
                                handleSettingsSourcePopup(sourceIndex)
                            }}
                            className="settings-item"
                        >
                            {source.label}
                        </button>
                        <button
                            onClick={() => {
                                handleRemoveSource(sourceIndex)
                            }}
                            className="settings-item"
                        >
                            DELETE
                        </button>
                        </div>
                    )
                })}
                <button
                            onClick={() => {
                                handleAddSource()
                            }}
                            className="settings-item"
                        >
                            ADD SOURCE
                        </button>
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
            {selectedSourceIndex === -1 ? (
                <React.Fragment />
            ) : (
                <SettingsSourcePopUp
                    sources={settingsSources}
                    setSources={setSettingsSources}
                    discoveredNdiSources={props.discoveredNdiSources}
                    selectedPopUp={selectedSourceIndex}
                    setSelectedPopUp={setselectedSourceIndex}
                />
            )}
        </div>
    )
}

export default SettingsPage
