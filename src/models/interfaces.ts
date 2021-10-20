export interface ISource {
    label: string
    dnsName: string
    url: string
}

export interface ITarget {
    label: string
    selectedSource: number
}

export interface IDiscoveredNdiSource {
    name: string
    urlAddress: string
}
