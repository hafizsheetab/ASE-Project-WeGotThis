export interface PriceMode {
    displayValue: string
    id: number
}

export interface OfferType {
    displayValue: string
    id: number
}

export interface OfferCategory {
    displayValue: string
    id: number
    subcategories: Array<{
        displayValue: string
        id: number
    }>
}

export interface OfferTemplateResponse {
    priceModes: Array<PriceMode>
    offerTypes: Array<OfferType>
    offerCategories: Array<OfferCategory>
}

