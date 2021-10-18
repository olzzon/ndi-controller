import { INetWorkSource } from '../../models/interfaces'
import { logger } from '../utils/logger'

const ndi_mtx = require('bindings')('ndi_mtx')

export const initializeNdiRouting = (
    url: string,
    dnsSource: string,
    targetLabel: string,
    targetIndex: number
) => {
    let status = ndi_mtx.initializeRouting(
        url,
        dnsSource,
        targetLabel,
        targetIndex
    )
    if ('completed' !== status) {
        logger.error(`NDI Error : ${status}`)
    }
}

export const changeNdiRoutingSource = (
    urlSource: string,
    dnsSource: string,
    targetIndex
) => {
    let status = ndi_mtx.changeRoutingSource(urlSource, dnsSource, targetIndex)
    if ('completed' !== status) {
        logger.error(`NDI Error : ${status}`)
    }
}

export const findAllNdiSources = (): INetWorkSource[] => {
    let status = ndi_mtx.findSources()

    console.log('SEARCHING FOR NDI SOURCES FINISHED', status)
    return status
}
