import {Autocomplete, Box, Grid2, IconButton, Paper, Stack, TextField} from "@mui/material";
import DropdownField from "../../shared/components/DropdownField";
import styles from "./Home.module.css";
import {styled} from "@mui/material/styles";
import { useState } from "react";
import Searchbar from "./Searchbar";
import DefaultDropdownField from "../../shared/components/DefaultDropdownField";
import CheckmarkDropdown from "../../shared/components/CheckmarkDropdown";

const SearchInput = styled("input")(() => ({
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "1rem",
    padding: "10px 16px",
    color: "black",
    backgroundColor: "white",
}));

const SearchFilters = () => {
    const [textFieldValue, setTextFieldValue] = useState<string | null>("")

    const handleSearch = (searchInput : string | null) => {
        //...
        console.log(searchInput);
        setTextFieldValue(searchInput)
      };

    return (
        <Box className={styles.searchFiltersWrapper}>
            <Searchbar onNewSearch={handleSearch}/>

            <Grid2 sx={{marginTop: "2em"}} container>
                <CheckmarkDropdown 
                        itemArray={["Zurich", "Bern"]}
                        label="Location"
                    />
                <CheckmarkDropdown
                    itemArray={["$0 - $50", "$50 - $100"]}
                    label="Price Range"
                />
                <CheckmarkDropdown
                    itemArray={["Today", "Tomorrow"]}
                    label="Next Availability"
                />
                <CheckmarkDropdown
                    itemArray={["Walking", "Pet Sitting"]}
                    label="Service Type"
                />
                <CheckmarkDropdown
                    itemArray={["4+ Stars", "3+ Stars"]}
                    label="User's Rating"
                />
                <CheckmarkDropdown
                    itemArray={["1 hr", "2 hrs"]}
                    label="Estimated Duration"
                />
                <CheckmarkDropdown
                    itemArray={["Option A", "Option B"]}
                    label="Advanced Search"
                />
                <CheckmarkDropdown
                    itemArray={["Price", "Rating"]}
                    label="Sorting"
                />
            </Grid2>
        </Box>
    );
};

export default SearchFilters;