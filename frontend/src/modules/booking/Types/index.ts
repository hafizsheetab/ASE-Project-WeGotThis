import { OfferResponseBody, OfferStatus } from "../../offerCreation/Types";
import { UserResponse } from "../../shared/Types";

export interface BookingRequestResponseBody {
    user: UserResponse
    status: OfferStatus
    price: Number
    offer: OfferResponseBody
}

