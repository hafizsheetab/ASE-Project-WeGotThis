import { OfferResponseBody } from "../../offerCreation/Types";
import { apiRequest } from "../../shared/services";
import { ContextData, ContextStoreData, ErrorBody } from "../../shared/Types";
import urls from "../../shared/Types/urls";
import { BookingRequestResponseBody } from "../Types";

export const getAllBookingRequest = async (
    store: ContextStoreData<ContextData>
): Promise<Array<BookingRequestResponseBody> | ErrorBody> => {
    const response = await apiRequest<null, Array<BookingRequestResponseBody>>(
        urls.getAllBookingRequests,
        null,
        store.context.token,
        store.context.locale,
        "get",
        store
    );
    return response;
};

export const acceptBookingRequest = async (
    store: ContextStoreData<ContextData>,
    offerId: string,
    requestId: string
): Promise<OfferResponseBody | ErrorBody> => {
    const response = await apiRequest<null, OfferResponseBody>(
        urls.acceptBookingRequest + offerId + "/" + requestId,
        null,
        store.context.token,
        store.context.locale,
        "put",
        store
    );
    return response;
};


export const rejectBookingRequest = async (
    store: ContextStoreData<ContextData>,
    offerId: string,
    requestId: string
): Promise<OfferResponseBody | ErrorBody> => {
    const response = await apiRequest<null, OfferResponseBody>(
        urls.rejectBookingRequest + offerId + "/" + requestId,
        null,
        store.context.token,
        store.context.locale,
        "put",
        store
    );
    return response;
};

export const withdrawBookingRequest = async (
    store: ContextStoreData<ContextData>,
    offerId: string,
    requestId: string
): Promise<OfferResponseBody | ErrorBody> => {
    const response = await apiRequest<null, OfferResponseBody>(
        urls.withdrawBookingRequest + offerId + "/" + requestId,
        null,
        store.context.token,
        store.context.locale,
        "put",
        store
    );
    return response;
};


export const completeBookingRequest = async (
    store: ContextStoreData<ContextData>,
    offerId: string,
    requestId: string
): Promise<OfferResponseBody | ErrorBody> => {
    const response = await apiRequest<null, OfferResponseBody>(
        urls.completeBookingRequest + offerId + "/" + requestId,
        null,
        store.context.token,
        store.context.locale,
        "put",
        store
    );
    return response;
};