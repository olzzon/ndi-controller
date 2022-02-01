//Node Modules:
const net = require('net')

import { ISource, ITarget } from '../../models/interfaces'
import { setCrossPoint } from '../mainThreadHandler'
//Utils:
import { logger } from '../utils/logger'

interface IClientList {
    clientConnection: any
    targetIndex: number
}

let clientList: IClientList[] = []
let sources: ISource[]
let targets: ITarget[]
let targetIndex: number

export const initializeSkaarhojServer = (
    sourcesProps: ISource[],
    targetsProps: ITarget[]
) => {
    sources = sourcesProps
    targets = targetsProps
    const server = net.createServer((client: any) => {
        clientList.push({ clientConnection: client, targetIndex: -1 })
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
                    initializeMapping(command)
                    skaarhojUpdateButtonLights()
                } else if (command === 'ping') {
                    client.clientConnection.write('pingo\n')
                } else if (command === 'ack') {
                    client.clientConnection.write('ack\n')
                } else if (command.substring(0, 4) === 'HWC#') {
                    handleReceivedCommand(command)
                } else if (command.includes('_serial')) {
                    const serial = command.slice(command.indexOf('=') + 1)
                    console.log('serial number is :', serial)
                    client.targetIndex = targets.findIndex((target) => {
                        return serial === '44'
                    })
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

const initializeMapping = (command: string) => {
    let hwButton = parseInt(command.substring(command.indexOf(':') + 1))
    // Initialize:
    console.log(
        'Initializing Skaarhoj remote mapping :',
        command,
        'Button nr :',
        hwButton
    )
    updateLabelState(hwButton - 1, 0)
}

const handleReceivedCommand = (command: string) => {
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
    if (btnNumber <= 6) {
        let sourceIndex = btnNumber - 1
        if (event === 'Up') {
            setCrossPoint(sourceIndex, 0) // For now only targetIndex 0 i supported
        }
    }
}

const updateLabelState = (sourceIndex: number, targetIndex: number) => {
    console.log('Skaarhoj Update label on: ', sourceIndex + 1)
    let formatSource = sources[sourceIndex]?.label || 'unknown'

    let formattetString =
        'HWCt#' + String(sourceIndex + 1) + '=' + '|||||' + formatSource + '\n'
    // 32767|||||label
    logger.info(`Sending command to Skaarhoj : ${formattetString}`)
    clientList.forEach((client) => {
        client.clientConnection.write(formattetString)
    })
}

export const skaarhojUpdateButtonLights = () => {
    console.log('Skaarhoj update button state')
    for (let i = 0; i <= 6; i++) {
        let active: string = targets[0].selectedSource === i ? '3' : '0'
        let formattetString: string =
            'HWC#' + String(i + 1) + '=' + active + '\n'
        clientList.forEach((client) => {
            client.clientConnection.write(formattetString)
        })
    }
}
