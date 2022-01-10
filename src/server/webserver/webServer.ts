const express = require('express')
const app = express()
const server = require('http').Server(app)
const socketServer = require('socket.io')(server)
const path = require('path')

import { logger } from '../utils/logger'
import * as IO from '../../models/SOCKET_IO_CONTANTS'
import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'
import { changeNdiRoutingSource, discoverNdiSources } from '../ndi/ndiMatrice'
import { setMatrixConnection } from '../ember/emberLocalClient'
import { emberServer } from '../ember/emberServer'
import {
    loadTargetList,
    updateSourcesList,
    updateTargetList,
} from '../utils/storage'

let socketClients: any[] = []

export const webServer = (
    sources: ISource[],
    targets: ITarget[],
    discoveredNdiSources: IDiscoveredNdiSource[]
) => {
    const socketServerConnection = () => {
        // socket.io server
        socketServer.on('connection', (socket: any) => {
            logger.info('Client connected :' + socket.id)
            socketClients.push({
                id: socket.id,
            })
            socket.emit(
                IO.UPDATE_CLIENT,
                sources,
                targets,
                discoveredNdiSources
            )

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
                        setMatrixConnection(sourceIndex, targetIndex)
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
                    }
                )
                .on(IO.LOAD_PRESET, (presetName: string) => {
                    let newTargets = loadTargetList(presetName)
                    if (newTargets.length > 0) {
                        newTargets.forEach((target: ITarget, index: number) => {
                            targets[index].selectedSource =
                                target.selectedSource || 0
                            setMatrixConnection(target.selectedSource, index)
                        })
                    }
                })
                .on(IO.SAVE_PRESET, (presetName: string) => {
                    updateTargetList(presetName, targets)
                })
        })
    }

    const RESTsetMatrix = (req: any, res: any) => {
        logger.info('Query : ', req.query)
        const targetIndex = req.query.target - 1
        const sourceIndex = req.query.source - 1
        setMatrixConnection(sourceIndex, targetIndex)
        res.end('Matrix changed')
    }

    const onEmberMtxChange = (info: any) => {
        if (info.sources[0] !== null) {
            logger.info(
                `Ember Client ${info.client} connected target : ${info.target} using source : ${info.sources}`
            )
            console.log(info)
            targets[info.target].selectedSource = parseInt(info.sources)
            changeNdiRoutingSource(
                sources[info.sources].url,
                sources[info.sources].dnsName,
                info.target
            )
            socketServer.emit(
                IO.UPDATE_CLIENT,
                sources,
                targets,
                discoveredNdiSources
            )
            updateTargetList('targets', targets)
        }
    }

    const emberServerConnetion = () => {
        emberServer
            .on('matrix-connect', (info) => {
                onEmberMtxChange(info)
            })
            .on('matrix-change', (info) => {
                onEmberMtxChange(info)
            })
    }

    const port: number = parseInt(process.env.PORT || '5901') || 5901
    app.use('/', express.static(path.join(__dirname, '../../client')))
    server.listen(port)
    logger.info(`Server started at http://localhost:${port}`)

    server.on('connection', () => {
        app.get('/', (req: any, res: any) => {
            res.sendFile(path.resolve('index.html'))
        })
        app.get('/state', (req: any, res: any) => {
            res.send({ targets, sources })
        }).post('/setmatrix', (req: any, res: any) => {
            RESTsetMatrix(req, res)
        })
    })

    socketServerConnection()
    emberServerConnetion()
}
