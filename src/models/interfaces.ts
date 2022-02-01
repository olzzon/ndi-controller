export interface ISource {
    label: string
    dnsName: string
    url: string
}

export interface ITarget {
    label: string
    selectedSource: number
    hwPanelId?: string
    sourceFilter?: Array<number>
}

export interface IDiscoveredNdiSource {
    name: string
    urlAddress: string
}
