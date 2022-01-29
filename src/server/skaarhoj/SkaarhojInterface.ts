export interface IRawSendMessage {
    message: string
    value: any
    type: RawSendTypes
}

export enum RawSendTypes {
    disabled,
    playNote,
    stopNote,
    sendControlChange,
    sendPitchBend,
}

export interface IRawReceiveMessage {
    message: string
    value: any
    type: RawReceiveTypes
}
export enum RawReceiveTypes {
    disabled,
    noteon,
    noteoff,
    controlchange,
    pitchbend,
}

export interface IRemoteProtocol {
    protocol: string
    label: string
    mode: string
    leadingZeros: boolean
    initializeCommands: [IRawSendMessage]
    fromRemote: {
        CHANNEL_PGM_ON_OFF: IRawReceiveMessage
        CHANNEL_PST_ON_OFF: IRawReceiveMessage
        CHANNEL_PFL_ON_OFF: IRawReceiveMessage
        CHANNEL_FADER_LEVEL: IRawReceiveMessage
        X_MIX: IRawReceiveMessage
        FADE_TO_BLACK: IRawReceiveMessage
        SNAP_RECALL: IRawReceiveMessage
    }
    toRemote: {
        STATE_CHANNEL_PGM: IRawSendMessage
        STATE_CHANNEL_PST: IRawSendMessage
        STATE_CHANNEL_PFL: IRawSendMessage
        STATE_CHANNEL_FADER_LEVEL: Array<IRawSendMessage>
    }
    fader: {
        min: number
        max: number
        zero: number
        step: number
    }
    meter: {
        min: number
        max: number
        zero: number
        test: number
    }
}

export const RemoteFaderPresets: { [key: string]: IRemoteProtocol } = {
    rawPanel: {
        protocol: 'RAW',
        label: 'Generic Skaarhoj Protocol',
        mode: 'client',
        leadingZeros: false,
        initializeCommands: [
            {
                message: '',
                value: '',
                type: RawSendTypes.disabled,
            },
        ],
        fromRemote: {
            CHANNEL_PGM_ON_OFF: {
                message: '',
                value: '',
                type: RawReceiveTypes.disabled,
            },
            CHANNEL_PST_ON_OFF: {
                message: '',
                value: '',
                type: RawReceiveTypes.disabled,
            },
            CHANNEL_PFL_ON_OFF: {
                message: '',
                value: '',
                type: RawReceiveTypes.disabled,
            },
            CHANNEL_FADER_LEVEL: {
                message: '0',
                value: '',
                type: RawReceiveTypes.controlchange,
            },
            X_MIX: {
                message: '',
                value: '',
                type: RawReceiveTypes.disabled,
            },
            FADE_TO_BLACK: {
                message: '',
                value: '',
                type: RawReceiveTypes.disabled,
            },
            SNAP_RECALL: {
                message: '',
                value: '',
                type: RawReceiveTypes.disabled,
            },
        },
        toRemote: {
            STATE_CHANNEL_PGM: {
                message: '',
                value: '',
                type: RawSendTypes.disabled,
            },
            STATE_CHANNEL_PST: {
                message: '',
                value: '',
                type: RawSendTypes.disabled,
            },
            STATE_CHANNEL_PFL: {
                message: '',
                value: '',
                type: RawSendTypes.disabled,
            },
            STATE_CHANNEL_FADER_LEVEL: [
                {
                    message: '21',
                    value: '',
                    type: RawSendTypes.sendControlChange,
                },
                {
                    message: '01',
                    value: '',
                    type: RawSendTypes.sendControlChange,
                },
            ],
        },
        fader: {
            min: 0,
            max: 127,
            zero: 70,
            step: 1,
        },
        meter: {
            min: 0,
            max: 1,
            zero: 0.75,
            test: 0.6,
        },
    },
}

export const RemoteFaderProtocolList = Object.getOwnPropertyNames(
    RemoteFaderPresets
).map((preset) => {
    return {
        value: preset,
        label: RemoteFaderPresets[preset].label,
    }
})
