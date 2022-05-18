export interface DescriptionResponse {
    text: string
    plain_text: string
    last_updated: string
    date_created: string
    snapshot: Snapshot
}

interface Snapshot {
    url: string
    width: number
    height: number
    status: string
}
