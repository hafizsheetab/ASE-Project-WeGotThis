import { OfferResponseBody, OfferStatus } from "../../offerCreation/Types";
import { UserResponse } from "../../shared/Types";

export interface BookingRequestResponseBody {
    user: UserResponse
    status: OfferStatus
    price: Number
    offer: OfferResponseBody
    offerOwnerReview: Boolean
    requestOwnerReview: Boolean
    requestOwnerComplete: Boolean
    offerOwnerComplete: Boolean
    time: Date
}

export type BookingCardProps = {
    title: string;
    type: string;
    availability: number;
    location: string;
    originalPrice: number;
    priceMode: number;
    newPrice?: number;
    statusType: string;
    requestId: string;
    offerId: string;
    userEmail: string;
    loadArray: () => void;
    request: BookingRequestResponseBody;
    offerOwnerId : string | number;
};