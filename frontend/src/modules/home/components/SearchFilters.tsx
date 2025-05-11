import {Box, Grid2} from "@mui/material";
import Searchbar from "./Searchbar";
import CheckmarkDropdown from "../../shared/components/CheckmarkDropdown";
import { SearchFiltersProps } from "../Types";
import PriceRangeSelect from "./PriceRangeSlider";
import NextAvailabilitySelect from "./NextAvailabilitySelect";
import { useEffect, useState } from "react";
  
const SearchFilters : React.FC<SearchFiltersProps> = ({filters, setFilters, offers, allOffers}) => {
    const handleSearch = (searchInput : string | null) => {
        setFilters((prev) => ({...prev, searchbarFilter: searchInput}))
      };

    const [uniqueCities, setCities] = useState<string[]>([])

    useEffect(() => {
        const uniqueCitiesSet = new Set<string>();
    
        allOffers.forEach((offer) => {
          const location = offer.location || ""; 
    
          if (location.includes(',')) {
            const locationParts = location.split(',').map((p) => p.trim());
    
            if (locationParts.length > 1) {
              const city = locationParts[locationParts.length - 2];
    
              if (city.includes(' ')){
                const cityParts = city.split(' ').map((part) => part.trim()).filter(Boolean);
                if (cityParts.length > 0) {
                    const cityName = cityParts.join(' ');
                    uniqueCitiesSet.add(cityName);
                }
              } else {
                uniqueCitiesSet.add(city)
              }
            } else {
              uniqueCitiesSet.add(location)
            }
          }
        });
    
        setCities(Array.from(uniqueCitiesSet));
      }, [allOffers]);

    return (
        <Box>
            <Searchbar onNewSearch={handleSearch} searchArray={offers}/>

            <Grid2 sx={{marginTop: "2em"}} container>
                <CheckmarkDropdown 
                        itemArray={uniqueCities}
                        label="Location"
                        onChange={(newLocation => 
                            setFilters((prev) => ({...prev, location: newLocation}))
                        )}
                    />
                <PriceRangeSelect
                    value={filters.priceRange}
                    onChange={(newRange) =>
                        setFilters((prev) => ({ ...prev, priceRange: newRange }))
                    }
                    label="Price Range"
                />
                <NextAvailabilitySelect
                    value={filters.nextAvailability}
                    onChange={(newDate) => 
                        setFilters((prev) => ({...prev, nextAvailability: newDate}))
                    }
                    label="Date"
                />
                
                <CheckmarkDropdown
                    itemArray={["Seeking", "Offering"]}
                    label="Service Type"
                    onChange={(newType) => 
                        setFilters((prev) => ({...prev, serviceType: newType}))
                    }
                />
            </Grid2>
        </Box>
    );
};

export default SearchFilters;