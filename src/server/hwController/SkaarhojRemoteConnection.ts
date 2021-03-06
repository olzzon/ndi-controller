//Node Modules:
const net = require('net')

import { ISource, ITarget } from '../../models/interfaces'
import { setCrossPoint } from '../mainThreadHandler'
//Utils:
import { logger } from '../utils/logger'

interface IClientList {
    clientConnection: any
    targetIndex: number
    sourcesOnbuttons: number[]
}

let clientList: IClientList[] = []
let sources: ISource[]
let targets: ITarget[]
let btnAmount: number = 0

export const initializeSkaarhojServer = (
    sourcesProps: ISource[],
    targetsProps: ITarget[]
) => {
    sources = sourcesProps
    targets = targetsProps
    const server = net.createServer((client: any) => {
        clientList.push({
            clientConnection: client,
            targetIndex: 0,
            sourcesOnbuttons: [],
        })
        setupSkaarhojConnection(clientList[clientList.length - 1])
    })

    server.listen(9923, '0.0.0.0')
    logger.info('Skaarhoj server listening at port 9923')
}

const setupSkaarhojConnection = (client: IClientList) => {
    client.clientConnection
        .on('data', (data: any) => {
            logger.debug('Skaarhoj Data Received: ' + data.toString())
            const receivedMessage: [string] = data.toString().split('\n')
            console.log('Message : ', receivedMessage)
            receivedMessage.forEach((command: string) => {
                if (command === 'RDY') {
                    client.clientConnection.write('ready ok\n')
                    client.clientConnection.write('list\n')
                } else if (command === 'list') {
                    client.clientConnection.write('ActivePanel=1\n')
                } else if (command.includes('map=')) {
                    console.log('Mapping :', command)
                } else if (command === 'ping') {
                    client.clientConnection.write('pingo\n')
                } else if (command === 'ack') {
                    client.clientConnection.write('ack\n')
                } else if (command.substring(0, 4) === 'HWC#') {
                    handleReceivedCommand(command, client)
                } else if (command.includes('_serial')) {
                    client.targetIndex = findTargetIndex(command)
                    findSourcesForPanel(client)
                    updateAllLabels()
                    skaarhojUpdateButtonLights()
                }
            })
        })
        .on('error', function () {
            if (this.clientList) {
                this.clientList.splice(this.clientList.find(client), 1)
            }
            logger.error('Lost Connection to Skaarhoj panel')
        })
        .on('close', function () {
            if (this.clientList) {
                this.clientList.splice(this.clientList.find(client), 1)
            }
            logger.info('Skaarhoj Connection closed')
        })
}

const findTargetIndex = (command: string): number => {
    const serial = command.slice(command.indexOf('=') + 1)
    let targetIndex: number = targets.findIndex((target: ITarget) => {
        return serial === target.hwPanelId
    })
    console.log('serial number is :', serial, 'Target index is : ', targetIndex)
    if (targetIndex === -1) {
        targetIndex = 0
    }
    btnAmount = targets[targetIndex].hwPanelBtnAmount
    return targetIndex
}

const findSourcesForPanel = (client: IClientList) => {
    let sourceIndex = 0
    let btnNumber = 0
    while (btnNumber < btnAmount && sources.length > sourceIndex) {
        if (!targets[client.targetIndex].sourceFilter?.includes(sourceIndex)) {
            client.sourcesOnbuttons.push(sourceIndex)
            btnNumber++
        }
        sourceIndex++
    }

    console.log('Sources for Panel :', client.sourcesOnbuttons)
}

const handleReceivedCommand = (command: string, client: IClientList) => {
    let btnNumber = parseInt(
        command.slice(command.indexOf('#') + 1, command.indexOf('.'))
    )
    let event = command.slice(command.indexOf('=') + 1)
    console.log(
        'Received from Skaarhoj :',
        command,
        'button nr :',
        btnNumber,
        'Event : ',
        event
    )
    if (btnNumber <= client.sourcesOnbuttons.length) {
        if (event === 'Up') {
            setCrossPoint(
                client.sourcesOnbuttons[btnNumber - 1],
                client.targetIndex
            ) // For now only targetIndex 0 i supported
        }
    }
}

const updateAllLabels = () => {
    clientList.forEach((client) => {
        client.sourcesOnbuttons.forEach(
            (sourceIndex: number, btnIndex: number) => {
                updateLabelState(sourceIndex, btnIndex, client)
            }
        )
    })
}

const updateLabelState = (sourceIndex: number, btnIndex: number, client: IClientList) => {
    console.log('Skaarhoj Update label on: ', btnIndex + 1)
    let formatSource = sources[sourceIndex]?.label || 'unknown'

    let formattetString =
        'HWCt#' + String(btnIndex + 1) + '=' + '|||||' + formatSource + '\n'
    // 32767|||||label
    logger.info(`Sending command to Skaarhoj : ${formattetString}`)
    client.clientConnection.write(formattetString)
}

export const skaarhojUpdateButtonLights = () => {
    console.log('Skaarhoj update button state')
    clientList.forEach((client) => {
        client.sourcesOnbuttons.forEach(
            (sourceIndex: number, btnIndex: number) => {
                let active: string =
                    targets[client.targetIndex].selectedSource === sourceIndex
                        ? '3'
                        : '0'
                let formattetString: string =
                    'HWC#' + String(btnIndex + 1) + '=' + active + '\n'
                client.clientConnection.write(formattetString)
            }
        )
    })
}
