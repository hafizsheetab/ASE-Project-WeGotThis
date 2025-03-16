import React from "react"

export interface ResponseBody<T>{
    status: true
    statusCode: number
    resourceType: "Object"|"List"
    resourceKeys: Array<string>
    resource: T
    popupMessage: string
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
}

