export interface ChangeSelfRequestBody {
    firstName: string
    lastName: string
    expire: boolean
    password: string
    phoneNumber: string
    location: string
    categoryIds: number[]
}