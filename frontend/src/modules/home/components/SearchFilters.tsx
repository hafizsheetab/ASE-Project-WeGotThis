import {Box, Grid2} from "@mui/material";
import Searchbar from "./Searchbar";
import CheckmarkDropdown from "../../shared/components/CheckmarkDropdown";
import { SearchFiltersProps } from "../Types";
import PriceRangeSelect from "./PriceRangeSlider";
import NextAvailabilitySelect from "./NextAvailabilitySelect";
  
const SearchFilters : React.FC<SearchFiltersProps> = ({filters, setFilters, offers}) => {
    const handleSearch = (searchInput : string | null) => {
        setFilters((prev) => ({...prev, searchbarFilter: searchInput}))
      };

    return (
        <Box>
            <Searchbar onNewSearch={handleSearch} searchArray={offers}/>

            <Grid2 sx={{marginTop: "2em"}} container>
                <CheckmarkDropdown 
                        itemArray={["Zurich", "Bern"]}
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