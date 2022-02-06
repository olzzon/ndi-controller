import { socketServer, initializeWebserver } from './webserver/webServer'
import {
    setEmberClientCrosspoint,
    initializeEmberLocalClient,
} from './ember/emberLocalClient'
import { emberServer, initializeEmberServer } from './ember/emberServer'
import {
    initializeSkaarhojServer,
    skaarhojUpdateButtonLights,
} from './hwController/SkaarhojRemoteConnection'
import {
    changeNdiRoutingSource,
    discoverNdiSources,
    initializeNdiRouting,
} from './ndi/ndiMatrice'
import * as IO from '../models/SOCKET_IO_CONTANTS'

import {
    loadSourceList,
    loadTargetList,
    setupDefaultSources,
    setupDefaultTargets,
    updateTargetList,
} from './utils/storage'
import { logger } from './utils/logger'
import { IDiscoveredNdiSource, ISource, ITarget } from '../models/interfaces'

let sources: ISource[]
let targets: ITarget[]
let discoveredNdiSources: IDiscoveredNdiSource[]

export const initializeMainThread = () => {

    initializeEmberServer().then(() => {
        initializeEmberLocalClient()
            .then(() => {
                discoveredNdiSources = discoverNdiSources()
                sources =
                    loadSourceList() ||
                    setupDefaultSources(discoveredNdiSources)
                targets = loadTargetList('targets') || setupDefaultTargets()

                setAllCrossPoints(sources, targets)
                initializeWebserver(sources, targets, discoveredNdiSources)
                initializeSkaarhojServer(sources, targets)
                emberServerListener()
            })
            .catch((error) => {
                logger.error('Error initializing NDI Controller', error)
            })
    })
}

const emberServerListener = () => {
    emberServer
        .on('connection', (client: any) => {
            console.log('ember Client connected :', client)
            setAllCrossPoints(sources, targets)
        })
        .on('disconnected', (client: any) => {
            console.log('ember Client disconnected :', client)
        })
        .on('matrix-connect', (info) => {
            onEmberMtxChange(info)
        })
        .on('matrix-change', (info) => {
            onEmberMtxChange(info)
        })

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
            skaarhojUpdateButtonLights()
        } else {
            if (targets[info.target].selectedSource > 0) {
                setEmberClientCrosspoint(
                    targets[info.target].selectedSource,
                    info.target
                )
            }
        }
    }
}

export const setCrossPoint = (sourceIndex: number, targetIndex: number) => {
    setEmberClientCrosspoint(sourceIndex, targetIndex)
}

const setAllCrossPoints = (sources: ISource[], targets: ITarget[]) => {
    targets.forEach((target: ITarget, targetIndex) => {
        if (sources[target.selectedSource]) {
            logger.info(
                `Initializing Crosspoint Source : ${target.selectedSource}  to ${targetIndex}`
            )
            setEmberClientCrosspoint(target.selectedSource, targetIndex)
            initializeNdiRouting(
                sources[target.selectedSource].url,
                sources[target.selectedSource].dnsName,
                targets[targetIndex].label,
                targetIndex
            )
        } else {
            logger.info(
                'Target Index :' + targetIndex + ' did not have a valid source'
            )
        }
    })
}
