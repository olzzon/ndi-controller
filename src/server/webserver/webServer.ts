const { app } = require('electron')
const express = require('express')
const expressApp = express()
const server = require('http').Server(expressApp)
export const socketServer = require('socket.io')(server)
const path = require('path')

import { logger } from '../utils/logger'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'
import { discoverNdiSources } from '../ndi/ndiMatrice'

import {
    loadTargetList,
    updateSourcesList,
    updateTargetList,
} from '../utils/storage'
import { setCrossPoint } from '../mainThreadHandler'

let socketClients: any[] = []
const presetList = ['Salvo 1', 'Salvo 2', 'Salvo 3', 'Salvo 4']
let sources: ISource[]
let targets: ITarget[]
let discoveredNdiSources: IDiscoveredNdiSource[]
let NDI_CONTROLLER_VERSION = process.env.npm_package_version
if (app) {
    NDI_CONTROLLER_VERSION = app.getVersion()
}


export const initializeWebserver = (
    sourcesProps: ISource[],
    targetsProps: ITarget[],
    discoveredNdiSourcesProps: IDiscoveredNdiSource[]
) => {
    sources = sourcesProps
    targets = targetsProps
    discoveredNdiSources = discoveredNdiSourcesProps


    const port: number = parseInt(process.env.PORT || '5901') || 5901
    expressApp.use('/', express.static(path.join(__dirname, '../../client')))
    server.listen(port)
    logger.info(`Webserver started at http://localhost:${port}`)

    server.on('connection', () => {
        expressApp.get('/', (req: any, res: any) => {
            res.sendFile(path.resolve('index.html'))
        })
        expressApp
            .get('/state', (req: any, res: any) => {
                res.send({ targets: targetsProps, sources: sourcesProps })
            })
            .post('/setmatrix', (req: any, res: any) => {
                RESTsetMatrix(req, res)
            })
            .post('/recall', (req: any, res: any) => {
                RESTrecallPreset(req, res)
            })
    })

    socketServerConnection()
}

const socketServerConnection = () => {
    // socket.io server
    socketServer.on('connection', (socket: any) => {
        logger.info('Client connected :' + socket.id)
        socketClients.push({
            id: socket.id,
        })
        socket.emit(IO.UPDATE_CLIENT, sources, targets, discoveredNdiSources, NDI_CONTROLLER_VERSION)

        socket
            .on('disconnecting', () => {
                socketClients = socketClients.filter((client) => {
                    return client.id !== socket.id
                })
            })
            .once('disconnect', () => {
                logger.debug(`Socket with id: ${socket.id} disconnected`)
            })
            .on(
                IO.CHANGE_SOURCE,
                (sourceIndex: number, targetIndex: number) => {
                    setCrossPoint(sourceIndex, targetIndex)
                }
            )
            .on(IO.DISCOVER_NDI_SOURCES, () => {
                console.log('Discovering sources')
                discoveredNdiSources = discoverNdiSources()
                socket.emit(
                    IO.UPDATE_CLIENT,
                    sources,
                    targets,
                    discoveredNdiSources
                )
            })
            .on(
                IO.SAVE_SETTINGS,
                (newSources: ISource[], newTargets: ITarget[]) => {
                    updateSourcesList(newSources)
                    updateTargetList('targets', newTargets)
                    sources = newSources
                    targets = newTargets
                    socket.emit(
                        IO.UPDATE_CLIENT,
                        sources,
                        targets,
                        discoveredNdiSources
                    )
                    // Delay restart:
                    setTimeout(() => {
                        if (app) {
                            app.relaunch()
                            app.exit(0)
                        } else {
                            process.exit(0)
                        }
                    }, 2000)
                }
            )
            .on(IO.LOAD_PRESET, (presetName: string) => {
                loadPreset(presetName)
            })
            .on(IO.SAVE_PRESET, (presetName: string) => {
                updateTargetList(presetName, targets)
            })
    })
}

const loadPreset = (presetName) => {
    let newTargets = loadTargetList(presetName)
    if (newTargets.length > 0) {
        targets.forEach((target: ITarget, index: number) => {
            if (newTargets[index]?.selectedSource < sources.length) {
                target.selectedSource =
                    newTargets[index]?.selectedSource || target.selectedSource
                setCrossPoint(target.selectedSource, index)
            }
        })
    }
}

const RESTsetMatrix = (req: any, res: any) => {
    logger.info('Query : ', req.query)
    const targetIndex = req.query.target - 1
    const sourceIndex = req.query.source - 1
    setCrossPoint(sourceIndex, targetIndex)
    res.end('Matrix changed')
}

const RESTrecallPreset = (req: any, res: any) => {
    logger.info('Query : ', req.query)
    const presetNumber = req.query.preset
    if (presetNumber < presetList.length) {
        loadPreset(presetList[req.query.preset - 1])
        res.end(presetList[req.query.preset - 1] + ' loaded')
    } else {
        res.end('Invalid preset index')
    }
}
