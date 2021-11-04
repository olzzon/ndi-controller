import React, { useEffect, useState } from 'react'
import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'
import '../styles/Settings.css'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
import { socketClient } from './mainPage'
import SettingsSourcePopUp from './settingsSourcePopUp'
import SettingsTargetPopUp from './settingsTargetPopUp'

interface ISettingsProps {
    sources: ISource[]
    targets: ITarget[]
    discoveredNdiSources: IDiscoveredNdiSource[]
    setSources: React.Dispatch<React.SetStateAction<ISource[]>>
    handleShowSettings(): void
}

const SettingsPage: React.FC<ISettingsProps> = (props) => {
    const [selectedSourceIndex, setselectedSourceIndex] = useState<number>(-1)
    const [selectedTargetIndex, setselectedTargetIndex] = useState<number>(-1)
    const [settingsSources, setSettingsSources] = useState<ISource[]>(
        props.sources
    )
    const [settingsTargets, setSettingsTargets] = useState<ITarget[]>(
        props.targets
    )

    const handleSaveSettings = () => {
        socketClient.emit(IO.SAVE_SETTINGS, settingsSources, settingsTargets)
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
        newSources.push({ label: '', dnsName: '', url: '' })
        setSettingsSources(newSources)
        setselectedSourceIndex(newSources.length - 1)
    }

    const handleSettingsTargetPopup = (targetIndex: number) => {
        setselectedTargetIndex(targetIndex)
    }

    const handleAddTarget = () => {
        let newTargets = [...settingsTargets]
        newTargets.push({ label: '', selectedSource: 0 })
        setSettingsTargets(newTargets)
        setselectedTargetIndex(newTargets.length - 1)
    }

    const renderSourceList = () => {
        return (
            <div className="settings-list">
                <div className="settings-header">SOURCES :</div>
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
                <div className="settings-header">TARGETS :</div>
                {settingsTargets.map((target, targetIndex) => {
                    return (
                        <div>
                            <button
                                key={targetIndex}
                                onClick={() => {
                                    handleSettingsTargetPopup(targetIndex)
                                }}
                                className="settings-item"
                            >
                                {target.label}
                            </button>
                        </div>
                    )
                })}
                <button
                    onClick={() => {
                        handleAddTarget()
                    }}
                    className="settings-item"
                >
                    ADD TARGET
                </button>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="settings">
                {renderSourceList()}
                {renderTargetList()}
            </div>
            <div className="foot-container">

            <button
                className="settings-cancel"
                onClick={() => {
                    handleCancelSettings()
                }}
                >
                CANCEL
            </button>
            <button
                className="settings-update"
                onClick={() => {
                    handleSaveSettings()
                }}
                >
                UPDATE
            </button>
                </div>
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
            {selectedTargetIndex === -1 ? (
                <React.Fragment />
            ) : (
                <SettingsTargetPopUp
                    targets={settingsTargets}
                    setTargets={setSettingsTargets}
                    discoveredNdiSources={props.discoveredNdiSources}
                    selectedPopUp={selectedTargetIndex}
                    setSelectedPopUp={setselectedTargetIndex}
                />
            )}
        </div>
    )
}

export default SettingsPage
