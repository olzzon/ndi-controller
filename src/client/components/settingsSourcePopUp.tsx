import React, { useState } from 'react'
import { IDiscoveredNdiSource, ISource } from '../../models/interfaces'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
import '../styles/SettingsPopup.css'
import { socketClient } from './mainPage'

interface ISettingsSourcePopup {
    sources: ISource[]
    setSources: React.Dispatch<React.SetStateAction<ISource[]>>
    selectedPopUp: number
    setSelectedPopUp: React.Dispatch<React.SetStateAction<number>>
    discoveredNdiSources: IDiscoveredNdiSource[]
}

const SettingsSourcePopUp: React.FC<ISettingsSourcePopup> = (props) => {
    const [label, setLabel] = useState<string>(
        props.sources[props.selectedPopUp].label
    )
    const [dnsName, setDnsName] = useState<string>(
        props.sources[props.selectedPopUp].dnsName
    )
    const [url, setUrl] = useState<string>(
        props.sources[props.selectedPopUp].url
    )

    const handleDiscoverNDISources = () => {
        socketClient.emit(IO.DISCOVER_NDI_SOURCES)
    }

    const handleUpdateChange = () => {
        let newSources: ISource[] = props.sources
        newSources[props.selectedPopUp] = { label, dnsName, url }
        props.setSources(newSources)
        props.setSelectedPopUp(-1)
    }

    const handleCancelChange = () => {
        props.setSelectedPopUp(-1)
    }

    const handleRemoveSource = (sourceIndex: number) => {
        let newSources = props.sources
        newSources.splice(sourceIndex, 1)
        props.setSources(newSources)
        props.setSelectedPopUp(-1)
    }

    const handleSelectNdiSource = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        let selectedFromList = parseInt(event.target.value)
        setLabel(props.discoveredNdiSources[selectedFromList].name)
        setDnsName(props.discoveredNdiSources[selectedFromList].name)
        setUrl(props.discoveredNdiSources[selectedFromList].urlAddress)
    }

    const handleUserLabelInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLabel(event.target.value)
    }
    const handleUserDnsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDnsName(event.target.value)
    }
    const handleUserIpInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value)
    }
    return (
        <div className="settings-popup">
            <div className="settings-popup-header">
                Change Source : {props.sources[props.selectedPopUp].dnsName}
            </div>
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
                NDI Name :
                <input
                    className="settings-popup-input"
                    type="text"
                    value={dnsName}
                    onChange={(event) => handleUserDnsInput(event)}
                />
            </label>
            <label className="settings-popup-label">
                NDI URL :
                <input
                    className="settings-popup-input"
                    type="text"
                    value={url}
                    onChange={(event) => handleUserIpInput(event)}
                />
            </label>
            <div className="settings-popup-container-select">
                <select
                    className="settings-popup-select"
                    onChange={(event) => handleSelectNdiSource(event)}
                >
                    {props.discoveredNdiSources.map(
                        (
                            discoveredNdiSource: IDiscoveredNdiSource,
                            index: number
                        ) => {
                            return (
                                <option key={index} value={index}>
                                    {discoveredNdiSource.name}
                                </option>
                            )
                        }
                    )}
                </select>
                <button
                    className="settings-popup-ndi"
                    onClick={() => {
                        handleDiscoverNDISources()
                    }}
                >
                    RE-DISCOVER
                </button>
            </div>
            <div className="settings-popup-container-foot">
                <button
                    onClick={() => {
                        handleRemoveSource(props.selectedPopUp)
                    }}
                    className="settings-popup-delete"
                >
                    REMOVE SOURCE
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

export default SettingsSourcePopUp
