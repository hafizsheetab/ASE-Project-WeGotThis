import OfferViewBody from "../../modules/offerView/components/OfferViewBody.tsx";
import { Paper } from "@mui/material";
import styles from "../css/Pages.module.css";

const OfferView = () => {
    return (
        <Paper className={styles.offerSectionContainer} elevation={3}>
            <OfferViewBody/>
        </Paper>
    )
};

export default OfferView;