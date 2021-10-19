import { IDiscoveredNdiSource } from '../../models/interfaces'
import { logger } from '../utils/logger'

const ndi_mtx = require('bindings')('ndi_mtx')

export const initializeNdiRouting = (
    url: string,
    dnsName: string,
    targetLabel: string,
    targetIndex: number
) => {
    let status = ndi_mtx.initializeRouting(
        url,
        dnsName,
        targetLabel,
        targetIndex
    )
    if ('completed' !== status) {
        logger.error(`NDI Error : ${status}`)
    }
}

export const changeNdiRoutingSource = (
    urlSource: string,
    dnsName: string,
    targetIndex
) => {
    let status = ndi_mtx.changeRoutingSource(urlSource, dnsName, targetIndex)
    if ('completed' !== status) {
        logger.error(`NDI Error : ${status}`)
    }
}

export const discoverNdiSources = (): IDiscoveredNdiSource[] => {
    let status = ndi_mtx.findSources()

    console.log('SEARCHING FOR NDI SOURCES FINISHED', status)
    return [{ name: 'Discovered Sources :', url: '0.0.0.0' }, ...status]
}
