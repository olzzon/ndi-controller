import React, { useState } from 'react'
import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
import '../styles/SettingsPopup.css'
import { socketClient } from './mainPage'

interface ISettingsSourcePopup {
    targets: ITarget[]
    setTargets: React.Dispatch<React.SetStateAction<ITarget[]>>
    selectedPopUp: number
    setSelectedPopUp: React.Dispatch<React.SetStateAction<number>>
    discoveredNdiSources: IDiscoveredNdiSource[]
}

const SettingsTargetPopUp: React.FC<ISettingsSourcePopup> = (props) => {
    const [label, setLabel] = useState<string>(
        props.targets[props.selectedPopUp].label
    )
    const [selectedSource] = useState<number>(
        props.targets[props.selectedPopUp].selectedSource
    )
    const [hwPanelId, setHwPanelId] = useState<string>(
        props.targets[props.selectedPopUp].hwPanelId || ''
    )

    const handleUpdateChange = () => {
        let newTargets: ITarget[] = props.targets
        newTargets[props.selectedPopUp] = { label, selectedSource, hwPanelId }
        props.setTargets(newTargets)
        props.setSelectedPopUp(-1)
    }

    const handleCancelChange = () => {
        props.setSelectedPopUp(-1)
    }

    const handleRemoveTarget = (targetIndex: number) => {
        let newTargets = props.targets
        newTargets.splice(targetIndex, 1)
        props.setTargets(newTargets)
        props.setSelectedPopUp(-1)
    }

    const handleUserLabelInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLabel(event.target.value)
    }

    const handleHwPanelId = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setHwPanelId(event.target.value)
    }

    return (
        <div className="settings-popup">
            <div className="settings-popup-header">Change Target Label:</div>
            <label className="settings-popup-label">
                Label :
                <input
                    className="settings-popup-input"
                    type="text"
                    value={label}
                    onChange={(event) => handleUserLabelInput(event)}
                />
            </label>
            <label className="settings-popup-label">
                HW Id (serial) :
                <input
                    className="settings-popup-input"
                    type="text"
                    value={hwPanelId}
                    onChange={(event) => handleHwPanelId(event)}
                />
            </label>
            <div className="settings-popup-container-foot">
                <button
                    onClick={() => {
                        handleRemoveTarget(props.selectedPopUp)
                    }}
                    className="settings-popup-delete"
                >
                    delete
                </button>

                <button
                    className="settings-popup-cancel"
                    onClick={() => {
                        handleCancelChange()
                    }}
                >
                    CANCEL
                </button>
                <button
                    className="settings-popup-update"
                    onClick={() => {
                        handleUpdateChange()
                    }}
                >
                    UPDATE
                </button>
            </div>
        </div>
    )
}

export default SettingsTargetPopUp
