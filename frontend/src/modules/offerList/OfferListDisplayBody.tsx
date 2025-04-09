import PaginationControlled from '../shared/components/PaginationControls';
import styles from "../booking/Booking.module.css";
import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import OfferList from './OfferList';
import { OfferResponseBody } from '../offerCreation/Types';
import ContextStore from '../../utils/ContextStore';
import { getAllOffers } from '../home/services';

const OfferListDisplayBody = () => {
  const maxNumOfItemsOnPage = 25;
  const [offers, setOffers] = useState<Array<OfferResponseBody>>([])

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

    const [tabSetting, setTabSetting] = useState({
        serviceType : "seeking",
    });

  const handlePaginationChange = (page : number) => {
    console.log(`Page has changed to ${page}`)
  }

  return (
    <Stack className={styles.bookingContent} spacing={3}>
        <Typography variant="h4">My Offers as a:</Typography>
        <Stack divider={<Divider orientation="horizontal" flexItem />} sx={{width: "100%", py: 2}}>
              <Tabs
                orientation='horizontal'
                centered
                variant="fullWidth"
                value={tabSetting.serviceType}
                onChange={(e, val) => setTabSetting({...tabSetting, serviceType: val})}
                aria-label="Vertical tabs example"
              >
                <Tab sx={{fontSize: "1em"}} value={'seeking'} label="Service Seeker"/>
                <Tab sx={{fontSize: "1em"}} value={'offering'} label="Service Provider"/>
              </Tabs>

              <Box sx={{ flex: 1, py: 4}}>  
                <PaginationControlled numberOfItems={offers.filter((offer) => offer.type.displayValue.match(tabSetting.serviceType)).length} maxItemsOnOnePage={maxNumOfItemsOnPage} onPaginationClick={handlePaginationChange}/>
                <OfferList serviceType={tabSetting.serviceType} offers={offers}/>
              </Box>
        </Stack>
    </Stack>

  )
}

export default OfferListDisplayBody