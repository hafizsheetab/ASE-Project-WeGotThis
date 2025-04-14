export interface ProfileInfoDisplayTypes {
    name: string
    profileImg: string,
    location : string
    registrationYear : string
    providedService: number
    seekedServices: number
    avgRating: number
    usersInterest: UserCategory[]
}

export interface UserCategory {
    displayValue: string
    id: number
}

export interface Reviews {
    rating: number
    review: string
    date: string //change to timestamp format
    user: string //change to userid or something to receive the user name and user image
}