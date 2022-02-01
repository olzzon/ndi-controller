import React, { useState } from 'react'
import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'
import '../styles/SettingsPopup.css'

interface ISettingsSourcePopup {
    targets: ITarget[]
    sources: ISource[]
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
    const [sourceFilter, setSourceFilter] = useState<number[]>(
        props.targets[props.selectedPopUp].sourceFilter || []
    )

    const handleUpdateChange = () => {
        let newTargets: ITarget[] = props.targets
        newTargets[props.selectedPopUp] = { label, selectedSource, hwPanelId, sourceFilter }
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

    const handleSelectSources = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        let sourceFilter = Array.from(event.target.selectedOptions).map((selection) => {return parseInt(selection.value)})
        console.log('Selected sources to exclude :', sourceFilter)
        setSourceFilter(sourceFilter)
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
            <label className="settings-popup-label">
                Panel exclude :
                <select
                    className="settings-popup-select-multiple"
                    onChange={(event) => handleSelectSources(event)}
                    multiple={true}
                >
                    {props.sources.map(
                        (source: ISource,
                            index: number
                        ) => {
                            return (
                                <option key={index} value={index}>
                                    {source.label}
                                </option>
                            )
                        }
                    )}
                </select>
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
