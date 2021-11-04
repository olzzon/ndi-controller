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
    const [label, setLabel] = useState<string>(props.targets[props.selectedPopUp].label)
    const [selectedSource] = useState<number>(props.targets[props.selectedPopUp].selectedSource)

    const handleUpdateChange = () => {
        let newTargets: ITarget[] = props.targets
        newTargets[props.selectedPopUp] = {label, selectedSource}
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

    return (
        <div className="settings-popup">
            <div className="settings-popup-header">
                Change Target Label:
            </div>
            <label className="settings-popup-input">
                Label :
                <input
                    type="text"
                    value={label}
                    onChange={(event) => handleUserLabelInput(event)}
                />
            </label>
            <button
                                onClick={() => {
                                    handleRemoveTarget(props.selectedPopUp)
                                }}
                                className="settings-delete"
                            >
                                delete
                            </button>

            <button
                onClick={() => {
                    handleCancelChange()
                }}
            >
                CANCEL
            </button>
            <button
                onClick={() => {
                    handleUpdateChange()
                }}
            >
                UPDATE
            </button>
        </div>
    )
}

export default SettingsTargetPopUp
