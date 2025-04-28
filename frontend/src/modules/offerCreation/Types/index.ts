import { UserResponse } from "../../shared/Types"

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
}

export interface OfferStatus {
    displayValue: string
    id: number
}

export interface OfferTemplateResponse {
    priceModes: Array<PriceMode>
    offerTypes: Array<OfferType>
    offerCategories: Array<OfferCategory>
}

export interface OfferRequestBody {
    title : string
    description: string
    location: string
    priceModeId: number
    price: number
    availability: boolean
    typeId: number
    categoryIds: number[]
    startTime: number
    endTime: number
}

export interface OfferResponseBody {
    id: string
    owner: UserResponse
    title: string
    description: string
    location: string
    priceMode: PriceMode
    type: OfferType
    categories: Array<OfferCategory>
    price: number
    availability: boolean
    startTime: number
    endTime: number
    imageUrl: string
    requests: {
        id: string
        price: number
    }[]
}
