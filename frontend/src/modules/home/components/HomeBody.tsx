import {Box, Typography} from "@mui/material";
import SearchFilters from "./SearchFilters";
import OfferList from "./OfferList";
import styles from "./Home.module.css";

const HomeBody = () => {
    return (
        <>
            <Box className={styles.homeContent}>
                <Typography variant="h4">Find your next offer</Typography>
                <SearchFilters/>
                <OfferList/>
            </Box>
        </>
    );
};

export default HomeBody;