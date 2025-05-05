import React, { useContext, useEffect, useState } from "react";
import {Box, Grid2} from "@mui/material";
import OfferCard from "./OfferCard";
import { OfferResponseBody } from "../../offerCreation/Types";
import PaginationControlled from "../../shared/components/PaginationControls";

type OfferListProps = {
  offers : Array<OfferResponseBody>
}

const OfferList : React.FC<OfferListProps> = ({offers}) => {

  const handlePaginationChange = (page : number) => {
    console.log(`Page has changed to ${page}`)
  }

  return (
      <Box sx={{maxWidth: "1200px"}}>
        <PaginationControlled onPaginationClick={handlePaginationChange} numberOfItems={offers.length} maxItemsOnOnePage={25}/>
        <Grid2 container spacing={3}>
          {offers.map((offer, idx) => (
              <Grid2 size={{xs: 12, sm: 12, md: 6}} key={idx}>
                <OfferCard offer={offer} />
              </Grid2>
          ))}
        </Grid2>
      </Box>
  );
};

export default OfferList;