import {Stack, Typography} from "@mui/material";
import SearchFilters from "./SearchFilters";
import OfferList from "./OfferList";

const HomeBody = () => {
    return (
        <>
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
                <SearchFilters/>
                <OfferList/>
            </Stack>
        </>
    );
};

export default HomeBody;