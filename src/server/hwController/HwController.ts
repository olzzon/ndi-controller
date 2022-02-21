//Node Modules:

import { ISource, ITarget } from '../../models/interfaces'
//Utils:
import {
    initializeSkaarhojServer,
    skaarhojUpdateButtonLights,
} from './SkaarhojRemoteConnection'

interface IClientList {
    clientConnection: any
    targetIndex: number
    sourcesOnbuttons: number[]
}

export const initializeHwController = (
    sourcesProps: ISource[],
    targetsProps: ITarget[]
) => {
    initializeSkaarhojServer(sourcesProps, targetsProps)
}

export const hwControllerUpdateButtonLights = () => {
    skaarhojUpdateButtonLights()
}
