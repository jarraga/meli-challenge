export interface SuggestionsResponse {
    q: string
    suggested_queries: SuggestedQuery[]
}

export interface SuggestedQuery {
    q: string
    match_start: number
    match_end: number
}
