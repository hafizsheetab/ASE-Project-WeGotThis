"use client";
import { Paper } from "@mui/material";
import OfferCreationBody from "../../modules/offerCreation/components/OfferCreationBody";
import styles from "../css/Pages.module.css";

const OfferCreation = () => {
    return (
        <Paper className={styles.offerSectionContainer} elevation={3}>
            <OfferCreationBody/>
        </Paper>
    )
  };
  
  export default OfferCreation;
  