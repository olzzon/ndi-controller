//Node Modules:
const net = require('net')

//Utils:
import { logger } from '../utils/logger'

let clientList = []

export const initializeSkaarhojServer = () => {

    const server = net.createServer((client: any) => {
        clientList.push(client)
        setupSkaarhojConnection(client)
    })

    server.listen(9923, '0.0.0.0')
    logger.info('Skaarhoj server listening at port 9923')
}

const setupSkaarhojConnection = (client: any) => {
    client
        .on('data', (data: any) => {
            logger.debug('Skaarhoj Data Received: ' + data.toString())
            const receivedMessage: [string] = data.toString().split('\n')
            console.log('Message : ', receivedMessage)
                receivedMessage.forEach((command: string) => {
                    if (command === 'RDY') {
                        client.write('ready ok\n')
                    } else if (command === 'list') {
                        logger.info('Activating Skaarhoj panel')
                        client.write('ActivePanel=1\n')
                    } else if (command.includes('map=')) {
                        initializeMapping(command)
                    } else if (command === 'ping') {
                        client.write('pingo\n')
                    } else if (command === 'ack') {
                        client.write('ack\n')
                    } else if (command.substring(0, 4) === 'HWC#') {
                        handleReceivedCommand(command)
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
    logger.info('Initializing Skaarhoj remote')
    if (hwButton <= 80) {
        logger.data(hwButton).info('Initializing skaahoj fader - Button')
    }
}

const handleReceivedCommand = (command: string) => {
    let btnNumber = parseInt(
        command.slice(command.indexOf('#') + 1, command.indexOf('='))
    )
    let event = command.slice(command.indexOf('=') + 1)
    if (btnNumber <= 8) {
        let channelIndex = btnNumber - 1
        let level = 0
        if (event === 'Enc:1') {
            level += 0.01
            if (level > 1) {
                level = 1
            }
        } else if (event === 'Enc:2') {
            level += 0.1
            if (level < 0) {
                level = 0
            }
        } else if (event === 'Enc:-1') {
            level -= 0.01
            if (level < 0) {
                level = 0
            }
        } else if (event === 'Enc:-2') {
            level -= 0.1
            if (level < 0) {
                level = 0
            }
        }
        logger.debug(`Receivedbutton ${channelIndex + 1} Level : ${level}`)
    } else if (btnNumber > 80) {
        console.log('Btn number :', btnNumber)
    }
}

const updateMtxButtonState = (targetIndex: number, sourceIndex: number) => {
    let formatSource = String(sourceIndex + 1)
    let formatTarget = String(targetIndex + 1)
    let formattetString =
        'HWCt#' +
        String(targetIndex + 1) +
        '=' +
        formatSource +
        '|||||' +
        formatTarget +
        '\n'
    // 32767|||||label
    logger.info(`Sending command to Skaarhoj : ${formattetString}`)
    clientList.forEach((client) => {
        client.write(formattetString)
    })
}
