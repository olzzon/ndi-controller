import { IDiscoveredNdiSource, ISource, ITarget } from '../../models/interfaces'
import { logger } from './logger'
// Node Modules:
const fs = require('fs')
const path = require('path')
const homeDir = require('os').homedir()

export const setupDefaultSources = (discoveredNdiSources): ISource[] => {
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

export const setupDefaultTargets = (): ITarget[] => {
    return [
        { label: 'NDI Controller 1', selectedSource: 0 },
        { label: 'NDI Controller 2', selectedSource: 0 },
        { label: 'NDI Controller 3', selectedSource: 0 },
        { label: 'NDI Controller 4', selectedSource: 0 },
    ]
}

export const loadSourceList = (): ISource[] => {
    let sources: ISource[] = []
    try {
        sources = JSON.parse(
            fs.readFileSync(
                path.resolve(homeDir, 'ndi-controller', 'sources.json')
            )
        )
    } catch (error) {
        return []
    }
    return sources
}

export const loadTargetList = (fileName: string): ITarget[] => {
    let targets: ITarget[] = []
    try {
        targets = JSON.parse(
            fs.readFileSync(
                path.resolve(homeDir, 'ndi-controller', fileName + '.json')
            )
        )
    } catch (error) {
        return []
    }
    return targets
}

export const updateTargetList = (fileName: string, targets: ITarget[]) => {
    console.log('Saving Targets list :', targets)
    let json = JSON.stringify(targets)
    if (!fs.existsSync(path.resolve(homeDir, 'ndi-controller'))) {
        fs.mkdirSync(path.resolve(homeDir, 'ndi-controller'))
    }
    fs.writeFile(
        path.resolve(homeDir, 'ndi-controller', fileName + '.json'),
        json,
        'utf8',
        (error: any) => {
            if (error) {
                logger.error('Error writing ' + fileName + '.json file')
                console.log('Error writing .json file: ', error)
            } else {
                logger.info(fileName + '.json file updated')
            }
        }
    )
}

export const updateSourcesList = (sources: ISource[]) => {
    console.log('Saving Sources list :', sources)
    let json = JSON.stringify(sources)
    if (!fs.existsSync(path.resolve(homeDir, 'ndi-controller'))) {
        fs.mkdirSync(path.resolve(homeDir, 'ndi-controller'))
    }
    fs.writeFile(
        path.resolve(homeDir, 'ndi-controller', 'sources.json'),
        json,
        'utf8',
        (error: any) => {
            if (error) {
                logger.error('Error writing sources.json file')
                console.log('Error writing sources.json file: ', error)
            } else {
                logger.info('sources.json file updated')
            }
        }
    )
}
