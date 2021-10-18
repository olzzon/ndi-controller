import { logger } from '../utils/logger'
const fs = require('fs')
const path = require('path')

//@ts-ignore
import { EmberServer } from 'node-emberplus'
import { root } from './emberServerTree'

export const emberServer = new EmberServer('0.0.0.0', 9000, root) // start server on port 9000

export const initializeEmberServer = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        logger.info('Setting up Ember Server')

        emberServer.on('error', (error: any) => {
            if (
                (error.message + '').match(/econnrefused/i) ||
                (error.message + '').match(/disconnected/i)
            ) {
                logger.error('Ember connection not establised')
            } else {
                logger.error('Ember connection unknown error' + error.message)
            }
        })

        emberServer
            .listen()
            .then(() => {
                logger.info('Ember Server is listening on port : 9000')
                resolve()
            })
            .catch((error: Error) => {
                console.log(error.stack)
                reject('Error')
            })
    })
}
