import { initializeEmberLocalClient } from './ember/emberLocalClient'
import { initializeEmberServer } from './ember/emberServer'
import { setAllCrossPoints } from './utils/setCrossPoints'
import { webServer } from './webserver/webServer'

import { loadSourceList, loadTargetList } from './utils/storage'
import { logger } from './utils/logger'
import { discoverNdiSources } from './ndi/ndiMatrice'
import { IDiscoveredNdiSource } from '../models/interfaces'

initializeEmberServer().then(() => {
    initializeEmberLocalClient()
        .then(() => {
            let sources = loadSourceList()
            let targets = loadTargetList()
            let networkSources: IDiscoveredNdiSource[] = discoverNdiSources()

            setAllCrossPoints(sources, targets)
            webServer(sources, targets, networkSources)
        })
        .catch((error) => {
            logger.error('Error initializing Ember and NDI Server')
        })
})
