import React from 'react'
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
    const handleDiscoverNDISources = () => {
        socketClient.emit(IO.DISCOVER_NDI_SOURCES)
    }
    const handleSelectNdiSource = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        let newSources = props.sources
        let selectedFromList = parseInt(event.target.value)
        newSources[props.selectedPopUp] = {
            label: props.discoveredNdiSources[selectedFromList].name,
            dnsName: props.discoveredNdiSources[selectedFromList].name,
            url: props.discoveredNdiSources[selectedFromList].url,
        }
        props.setSources(newSources)
        console.log('Source changed to NDI source : ', event.target.value)
    }

    const handleUserLabelInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log('TYPING LABEL')
    }
    const handleUserDnsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('TYPING DNS')
    }
    const handleUserIpInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('TYPING IP')
    }
    const SettingsSourcePopup = () => {
        return (
            <div>
                <div className="settings-popup-header">
                    Change Source :{' '}
                    {props.sources[props.selectedPopUp].dnsName}
                </div>
                <label className="settings-popup-input">
                    Label :
                    <input
                        type="text"
                        value={props.sources[props.selectedPopUp].label}
                        onChange={(event) => handleUserLabelInput(event)}
                    />
                </label>
                <label className="settings-popup-input">
                    NDI Name :
                    <input
                        type="text"
                        value={props.sources[props.selectedPopUp].dnsName}
                        onChange={(event) => handleUserDnsInput(event)}
                    />
                </label>{' '}
                <label className="settings-popup-input">
                    NDI URL :
                    <input
                        type="text"
                        value={props.sources[props.selectedPopUp].url}
                        onChange={(event) => handleUserIpInput(event)}
                    />
                </label>{' '}
                <select onChange={(event) => handleSelectNdiSource(event)}>
                    {props.discoveredNdiSources.map(
                        (networkSource: IDiscoveredNdiSource, index: number) => {
                            return (
                                <option
                                    className="settings-popup-select"
                                    key={index}
                                    value={index}
                                >
                                    {networkSource.name}
                                </option>
                            )
                        }
                    )}
                </select>
                <button
                    onClick={() => {
                        handleDiscoverNDISources()
                    }}
                >
                    DISCOVER NDI
                </button>
                <button
                    onClick={() => {
                        props.setSelectedPopUp(-1)
                    }}
                >
                    CANCEL
                </button>
                <button
                    onClick={() => {
                        props.setSelectedPopUp(-1)
                    }}
                >
                    UPDATE
                </button>
            </div>
        )
    }

    return <div className={'settings-popup'}>{SettingsSourcePopup()}</div>
}

export default SettingsSourcePopUp
