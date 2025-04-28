import React from "react"
import { OfferCategory } from "../../offerCreation/Types"

export interface ResponseBody<T>{
    status: true
    statusCode: number
    resourceType: "Object"|"List"
    resourceKeys: Array<string>
    resource: T
    popupMessage: string
}
export interface VoidPositiveResponse {
    status: true
}
export interface ErrorBody {
    status: false
    statusCode: number
    formErrors: Array<{
        name: string,
        message: string
    }>
    popupMessage: string
    entityName: string
    service: string

}
export interface ContextStoreData<T>{
    context: T
    setContext: React.Dispatch<React.SetStateAction<T>>
}
export interface ContextData {
    token: string
    expire: boolean
    locale: "en" | "de"
    loading: boolean
    color: string
    user: UserResponse
    update: number
    setUpdate: React.Dispatch<React.SetStateAction<number>>
}

export interface UserResponse {
    firstName: string
    lastName: string
    email: string
    expire: boolean
    id: string
    phoneNumber: string
    location: string
    categories: Array<OfferCategory>
    imageUrl: string
}
