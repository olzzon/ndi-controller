import React from 'react'
import { INetWorkSource, ISource } from '../../models/interfaces'
import '../styles/SettingsPopup.css'

interface ISettingsSourcePopup {
    sources: ISource[]
    setSources: React.Dispatch<React.SetStateAction<ISource[]>>
    selectedPopUp: number
    setSelectedPopUp: React.Dispatch<React.SetStateAction<number>>
    networkSources: INetWorkSource[]
}

const SettingsSourcePopUp: React.FC<ISettingsSourcePopup> = (props) => {
    const settingsSourcePopup = () => {
        const handleSelectNdiSource = (
            event: React.ChangeEvent<HTMLSelectElement>
        ) => {
            let newSources = props.sources
            let selectedFromList = parseInt(event.target.value)
            newSources[props.selectedPopUp] = {
                label: props.networkSources[selectedFromList].name,
                dnsSource: props.networkSources[selectedFromList].name,
                url: props.networkSources[selectedFromList].url,
            }
            props.setSources(newSources)
            console.log('Source changed to NDI source : ', event.target.value)
        }

        const handleUserLabelInput = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            console.log('TYPING LABEL')
        }
        const handleUserDnsInput = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            console.log('TYPING DNS')
        }
        const handleUserIpInput = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            console.log('TYPING IP')
        }
        return (
            <div>
                <div className="settings-popup-header">
                    Change Source :{' '}
                    {props.sources[props.selectedPopUp].dnsSource}
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
                        value={props.sources[props.selectedPopUp].dnsSource}
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
                    {props.networkSources.map(
                        (networkSource: INetWorkSource, index: number) => {
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

    return <div className={'settings-popup'}>{settingsSourcePopup()}</div>
}

export default SettingsSourcePopUp
