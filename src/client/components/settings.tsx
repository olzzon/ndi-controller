import React, { useState } from 'react'
import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'
import '../styles/Settings.css'
import SettingsSourcePopUp from './settingsSourcePopUp'

interface ISettingsProps {
    sources: ISource[]
    targets: ITarget[]
    discoveredNdiSources: IDiscoveredNdiSource[]
    setSources: React.Dispatch<React.SetStateAction<ISource[]>>
}

const SettingsPage: React.FC<ISettingsProps> = (props) => {
    const [selectedSource, setSelectedSource] = useState<number>(-1)
    const renderSourceList = () => {
        const handleSettingsSourcePopup = (sourceIndex: number) => {
            setSelectedSource(sourceIndex)
        }

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
