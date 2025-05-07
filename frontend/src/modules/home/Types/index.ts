import { OfferResponseBody } from "../../offerCreation/Types";

export interface Filters {
    location: string[] | null;
    priceRange: [number, number] | null;
    nextAvailability: [number, number] | null;
    serviceType: string[] | null;
    searchbarFilter: string | null;
};

export interface SearchFiltersProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    offers: Array<OfferResponseBody>
};
    

export interface SearchbarProps {
    onNewSearch?: (searchInput : string | null) => void
    searchArray: Array<OfferResponseBody>
}

export type PriceRangeSelectProps = {
    value: [number, number] | null;
    onChange: (value: [number, number]) => void;
    label: string;
};

export type OfferListProps = {
    offers : Array<OfferResponseBody>
}
  
export type OfferCardProps = {
    offer: OfferResponseBody
};

export type DateTimeRangeSelectProps = {
    value: [number, number] | null; 
    onChange: (value: [number, number]) => void;
    label: string;
};