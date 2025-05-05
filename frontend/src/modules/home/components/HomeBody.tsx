import {Stack, Typography} from "@mui/material";
import SearchFilters from "./SearchFilters";
import OfferList from "./OfferList";
import { useContext, useEffect, useState } from "react";
import { OfferResponseBody } from "../../offerCreation/Types";
import { Filters, getAllOffers } from "../services";
import ContextStore from "../../../utils/ContextStore";

const HomeBody = () => {
    const [offers, setOffers] = useState<Array<OfferResponseBody>>([])
    const [allOffers, setAllOffers] = useState<Array<OfferResponseBody>>([])
    const [filters, setFilters] = useState<Filters>({
        location: null,
        priceRange: [0, 1000],
        nextAvailability: null,
        serviceType: null,
        searchbarFilter: null,
    })
    const store = useContext(ContextStore)

    useEffect(() => {
        (async () => {
          const vOffers = await getAllOffers(store)
          if("status" in vOffers){
            return
          }
          console.log(vOffers)
          setOffers(vOffers)
          setAllOffers(vOffers)
        })()  
    },[])

    useEffect(() => {
        updateOffers();
    }, [filters]);

    const updateOffers = () => {
        let filtered = [...allOffers];

        if (filters.priceRange) {
            filtered = filtered.filter(
                (o) => {
                    if (filters.priceRange != null){
                        return o.price >= filters.priceRange[0] && o.price <= filters.priceRange[1]
                    }
                }
            );
        }

        if (filters.nextAvailability){
            filtered = filtered.filter(
                (o) => { 
                    if(filters.nextAvailability != null) {
                        return o.startTime >= filters.nextAvailability[0] && o.endTime <= filters.nextAvailability[1]
                    }
                }
            )
        } 
        
        if (filters.serviceType && filters.serviceType.length > 0) {
          filtered = filtered.filter(
            (o) => filters.serviceType?.find(item => item.toLowerCase().match(o.type.displayValue.toLowerCase())));
        } 

        if (filters.searchbarFilter) {
            filtered = filtered.filter(
                (o) => {
                    if(filters.searchbarFilter != null) {
                        return o.title.toLowerCase().includes(filters.searchbarFilter.toLowerCase().trim())
                    }
                }
            )
        }

        setOffers(filtered);
    };


    return (
        <Stack 
            direction="column"
            sx={{
                margin: "0 auto",
                padding: "5rem 2rem",
                maxWidth: "1200px"
            }}
            gap={3}
        >
            <Typography variant="h4">Find your next offer</Typography>
            <SearchFilters filters={filters} setFilters={setFilters} offers={offers}/>
            <OfferList offers={offers}/>
        </Stack>
    );
};

export default HomeBody;