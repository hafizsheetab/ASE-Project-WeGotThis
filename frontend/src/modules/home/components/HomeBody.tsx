import {Box} from "@mui/material";
import SearchFilters from "./SearchFilters";
import OfferList from "./OfferList";
import styles from "./Home.module.css";

const HomeBody = () => {
    return (
        <>
            <Box className={styles.homeContent}>
                <SearchFilters/>
                <OfferList/>
            </Box>
        </>
    );
};

export default HomeBody;