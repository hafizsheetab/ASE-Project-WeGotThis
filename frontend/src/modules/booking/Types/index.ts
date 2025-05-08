import { OfferResponseBody, OfferStatus } from "../../offerCreation/Types";
import { UserResponse } from "../../shared/Types";

export interface BookingRequestResponseBody {
    user: UserResponse
    status: OfferStatus
    price: number
    offer: OfferResponseBody
    offerOwnerReview: boolean
    requestOwnerReview: boolean
    requestOwnerComplete: boolean
    offerOwnerComplete: boolean
    time: Date
}

export type BookingCardProps = {
    title: string;
    requestedOn: string;
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
    hasReview: boolean;
    loadArray: () => void;
    request: BookingRequestResponseBody;
    offerOwnerId : string | number;
};