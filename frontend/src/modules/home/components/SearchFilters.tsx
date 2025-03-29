import {Box, Grid2, IconButton, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DropdownField from "../../shared/components/DropdownField";
import styles from "./Home.module.css";
import {styled} from "@mui/material/styles";

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
    return (
        <Box className={styles.searchFiltersWrapper}>
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "55px",
                    borderRadius: "2px",
                    boxShadow: "none",
                    border: "1px solid #d1d5db",
                    overflow: "hidden",
                    mb: 1.5
                }}
            >
                <SearchInput placeholder="Search Aladdin"/>
                <DropdownField
                    itemsArray={["All Categories", "Pets", "Gardening"]}
                    defaultItem="All Categories"
                    containerSx={{border: "none",}}
                />
                <IconButton
                    sx={{
                        backgroundColor: "#f97316",
                        borderRadius: 0,
                        height: "100%",
                        width: "60px",
                        "&:hover": {
                            backgroundColor: "#fa921a",
                        },
                    }}
                >
                    <SearchIcon sx={{color: "white"}}/>
                </IconButton>
            </Paper>
            <Grid2 container spacing={1.5}>
                <DropdownField
                    itemsArray={["Location", "Zurich", "Bern"]}
                    defaultItem="Location"
                />
                <DropdownField
                    itemsArray={["Price Range", "$0 - $50", "$50 - $100"]}
                    defaultItem="Price Range"
                />
                <DropdownField
                    itemsArray={["Next Availability", "Today", "Tomorrow"]}
                    defaultItem="Next Availability"
                />
                <DropdownField
                    itemsArray={["Service Type", "Walking", "Pet Sitting"]}
                    defaultItem="Service Type"
                />
                <DropdownField
                    itemsArray={["User's Rating", "4+ Stars", "3+ Stars"]}
                    defaultItem="User's Rating"
                />
                <DropdownField
                    itemsArray={["Estimated Duration", "1 hr", "2 hrs"]}
                    defaultItem="Estimated Duration"
                />
                <DropdownField
                    itemsArray={["Advanced Search", "Option A", "Option B"]}
                    defaultItem="Advanced Search"
                />
                <DropdownField
                    itemsArray={["Sorting", "Price", "Rating"]}
                    defaultItem="Sorting"
                />
            </Grid2>
        </Box>
    );
};

export default SearchFilters;