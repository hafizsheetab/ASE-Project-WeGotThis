import React, { useContext, useEffect, useState } from "react";
import {Box, Grid2} from "@mui/material";
import OfferCard from "./OfferCard";
import { OfferResponseBody } from "../../offerCreation/Types";
import { getAllOffers } from "../services";
import ContextStore from "../../../utils/ContextStore";
import PaginationControlled from "../../shared/components/PaginationControls";


const OfferList = () => {
  const [offers, setOffers] = useState<Array<OfferResponseBody>>([])
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log("Go to page:", page);
  };
  const store = useContext(ContextStore)

  useEffect(() => {
    (async () => {
      const vOffers = await getAllOffers(store)
      if("status" in vOffers){
        return
      }
      console.log(vOffers)
      setOffers(vOffers)
    })()  
  },[])

  const handlePaginationChange = (page : number) => {
    console.log(`Page has changed to ${page}`)
  }

  return (
      <Box sx={{maxWidth: "1200px", mx: "auto"}}>
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