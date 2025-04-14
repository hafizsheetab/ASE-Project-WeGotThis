import { Paper } from "@mui/material";
import OfferEditBody from "../../modules/offerEdit/components/OfferEditBody.tsx";
import styles from "../css/Pages.module.css";

const OfferEdit = () => {
    return (
        <Paper className={styles.offerSectionContainer} elevation={3}>
            <OfferEditBody/>
        </Paper>
    )
};

export default OfferEdit;