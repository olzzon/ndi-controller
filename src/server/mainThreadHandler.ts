import { initializeEmberLocalClient } from './ember/emberLocalClient'
import { initializeEmberServer } from './ember/emberServer'
import { setAllCrossPoints } from './utils/setCrossPoints'
import { webServer } from './webserver/webServer'

import { loadSourceList, loadTargetList } from './utils/storage'
import { logger } from './utils/logger'
import { discoverNdiSources } from './ndi/ndiMatrice'
import { IDiscoveredNdiSource, ISource, ITarget } from '../models/interfaces'

const setupDefaultSources = (discoveredNdiSources): ISource[] => {
    let sources: ISource[] = []
    discoveredNdiSources.forEach((ndiSource: IDiscoveredNdiSource) => {
        sources.push({
            label: ndiSource.name,
            dnsName: ndiSource.name,
            url: ndiSource.urlAddress,
        })
    })
    return sources
}

const setupDefaultTargets = (): ITarget[] => {
    return [
        { label: 'NDI Controller 1', selectedSource: 0 },
        { label: 'NDI Controller 2', selectedSource: 0 },
        { label: 'NDI Controller 3', selectedSource: 0 },
        { label: 'NDI Controller 4', selectedSource: 0 },
    ]
}

export const initializeMainThread = () => {
    initializeEmberServer().then(() => {
        initializeEmberLocalClient()
            .then(() => {
                let discoveredNdiSources: IDiscoveredNdiSource[] =
                    discoverNdiSources()
                let sources =
                    loadSourceList() || setupDefaultSources(discoveredNdiSources)
                let targets = loadTargetList('targets') || setupDefaultTargets()

                setAllCrossPoints(sources, targets)
                webServer(sources, targets, discoveredNdiSources)
            })
            .catch((error) => {
                logger.error('Error initializing Ember and NDI Server')
            })
    })
}
