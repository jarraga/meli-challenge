export interface SearchResponse {
    site_id: string
    country_default_time_zone: string
    query: string
    paging: Paging
    results: Result[]
    sort: Sort
    available_sorts: AvailableSort[]
    filters: Filter[]
    available_filters: AvailableFilter[]
}

interface Paging {
    total: number
    primary_results: number
    offset: number
    limit: number
}

interface Result {
    id: string
    site_id: string
    title: string
    seller: Seller
    price: number
    prices: Prices
    sale_price: any
    currency_id: string
    available_quantity: number
    sold_quantity: number
    buying_mode: string
    listing_type_id: string
    stop_time: string
    condition: string
    permalink: string
    thumbnail: string
    thumbnail_id: string
    accepts_mercadopago: boolean
    installments: Installments
    address: Address
    shipping: Shipping
    seller_address: SellerAddress
    attributes: Attribute[]
    original_price?: number
    category_id: string
    official_store_id?: number
    domain_id: string
    catalog_product_id: string
    tags: string[]
    catalog_listing?: boolean
    use_thumbnail_id: boolean
    offer_score: any
    offer_share: any
    match_score: any
    winner_item_id: any
    melicoin: any
    discounts: any
    order_backend: number
    differential_pricing?: DifferentialPricing
}

interface Seller {
    id: number
    permalink: string
    registration_date: string
    car_dealer: boolean
    real_estate_agency: boolean
    tags: string[]
    seller_reputation: SellerReputation
    eshop?: Eshop
}

interface SellerReputation {
    power_seller_status?: string
    level_id: string
    metrics: Metrics
    transactions: Transactions
    real_level?: string
    protection_end_date?: string
}

interface Metrics {
    cancellations: Cancellations
    claims: Claims
    delayed_handling_time: DelayedHandlingTime
    sales: Sales
}

interface Cancellations {
    period: string
    rate: number
    value: number
    excluded?: Excluded
}

interface Excluded {
    real_value: number
    real_rate: number
}

interface Claims {
    period: string
    rate: number
    value: number
    excluded?: Excluded2
}

interface Excluded2 {
    real_value: number
    real_rate: number
}

interface DelayedHandlingTime {
    period: string
    rate: number
    value: number
    excluded?: Excluded3
}

interface Excluded3 {
    real_value: number
    real_rate: number
}

interface Sales {
    period: string
    completed: number
}

interface Transactions {
    canceled: number
    period: string
    total: number
    ratings: Ratings
    completed: number
}

interface Ratings {
    negative: number
    neutral: number
    positive: number
}

interface Eshop {
    seller: number
    eshop_rubro: any
    eshop_id: number
    nick_name: string
    site_id: string
    eshop_logo_url: string
    eshop_status_id: number
    eshop_experience: number
    eshop_locations: any[]
}

interface Prices {
    id: string
    prices: Price[]
    presentation: Presentation
    payment_method_prices: any[]
    reference_prices: ReferencePrice[]
    purchase_discounts: any[]
}

interface Price {
    id: string
    type: string
    amount: number
    regular_amount?: number
    currency_id: string
    last_updated: string
    conditions: Conditions
    exchange_rate_context: string
    metadata: Metadata
}

interface Conditions {
    context_restrictions: string[]
    start_time?: string
    end_time?: string
    eligible: boolean
}

interface Metadata {
    promotion_id?: string
    promotion_type?: string
}

interface Presentation {
    display_currency: string
}

interface ReferencePrice {
    id: string
    type: string
    conditions: Conditions2
    amount: number
    currency_id: string
    exchange_rate_context: string
    tags: any[]
    last_updated: string
}

interface Conditions2 {
    context_restrictions: string[]
    start_time?: string
    end_time?: string
    eligible: boolean
}

interface Installments {
    quantity: number
    amount: number
    rate: number
    currency_id: string
}

interface Address {
    state_id: string
    state_name: string
    city_id?: string
    city_name: string
}

interface Shipping {
    free_shipping: boolean
    mode: string
    tags: string[]
    logistic_type: string
    store_pick_up: boolean
}

interface SellerAddress {
    id: string
    comment: string
    address_line: string
    zip_code: string
    country: Country
    state: State
    city: City
    latitude: string
    longitude: string
}

interface Country {
    id: string
    name: string
}

interface State {
    id: string
    name: string
}

interface City {
    id?: string
    name: string
}

interface Attribute {
    id: string
    name: string
    value_name: string
    value_struct?: ValueStruct
    values: Value[]
    source: number
    value_id?: string
    attribute_group_id: string
    attribute_group_name: string
}

interface ValueStruct {
    number: number
    unit: string
}

interface Value {
    id?: string
    name: string
    struct?: Struct
    source: number
}

interface Struct {
    number: number
    unit: string
}

interface DifferentialPricing {
    id: number
}

interface Sort {
    id: string
    name: string
}

interface AvailableSort {
    id: string
    name: string
}

interface Filter {
    id: string
    name: string
    type: string
    values: Value2[]
}

interface Value2 {
    id: string
    name: string
    path_from_root?: PathFromRoot[]
}

interface PathFromRoot {
    id: string
    name: string
}

interface AvailableFilter {
    id: string
    name: string
    type: string
    values: Value3[]
}

interface Value3 {
    id: string
    name: string
    results: number
}
