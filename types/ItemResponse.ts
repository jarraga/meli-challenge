export interface ItemResponse {
    error?: string
    id: string
    site_id: string
    title: string
    subtitle: any
    seller_id: number
    category_id: string
    official_store_id: any
    price: number
    base_price: number
    original_price: any
    currency_id: string
    initial_quantity: number
    available_quantity: number
    sold_quantity: number
    sale_terms: SaleTerm[]
    buying_mode: string
    listing_type_id: string
    start_time: string
    stop_time: string
    condition: string
    permalink: string
    thumbnail_id: string
    thumbnail: string
    secure_thumbnail: string
    pictures: Picture[]
    video_id: any
    descriptions: any[]
    accepts_mercadopago: boolean
    non_mercado_pago_payment_methods: any[]
    shipping: Shipping
    international_delivery_mode: string
    seller_address: SellerAddress
    seller_contact: any
    location: Location
    coverage_areas: any[]
    attributes: Attribute[]
    warnings: any[]
    listing_source: string
    variations: any[]
    status: string
    sub_status: string[]
    tags: string[]
    warranty: string
    catalog_product_id: string
    domain_id: string
    parent_item_id: any
    differential_pricing: any
    deal_ids: any[]
    automatic_relist: boolean
    date_created: string
    last_updated: string
    health: any
    catalog_listing: boolean
    channels: string[]
}

interface SaleTerm {
    id: string
    name: string
    value_id?: string
    value_name: string
    value_struct?: ValueStruct
    values: Value[]
}

interface ValueStruct {
    number: number
    unit: string
}

interface Value {
    id?: string
    name: string
    struct?: Struct
}

interface Struct {
    number: number
    unit: string
}

interface Picture {
    id: string
    url: string
    secure_url: string
    size: string
    max_size: string
    quality: string
}

interface Shipping {
    mode: string
    free_methods: FreeMethod[]
    tags: string[]
    dimensions: any
    local_pick_up: boolean
    free_shipping: boolean
    logistic_type: string
    store_pick_up: boolean
}

interface FreeMethod {
    id: number
    rule: Rule
}

interface Rule {
    default: boolean
    free_mode: string
    free_shipping_flag: boolean
    value: any
}

interface SellerAddress {
    city: City
    state: State
    country: Country
    search_location: SearchLocation
    id: number
}

interface City {
    id: string
    name: string
}

interface State {
    id: string
    name: string
}

interface Country {
    id: string
    name: string
}

interface SearchLocation {
    neighborhood: Neighborhood
    city: City2
    state: State2
}

interface Neighborhood {
    id: string
    name: string
}

interface City2 {
    id: string
    name: string
}

interface State2 {
    id: string
    name: string
}

interface Location { }

interface Attribute {
    id: string
    name: string
    value_id?: string
    value_name: string
    value_struct?: ValueStruct2
    values: Value2[]
    attribute_group_id: string
    attribute_group_name: string
}

interface ValueStruct2 {
    number: number
    unit: string
}

interface Value2 {
    id?: string
    name: string
    struct?: Struct2
}

interface Struct2 {
    number: number
    unit: string
}