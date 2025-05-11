import PaginationControlled from './../../shared/components/PaginationControls';
import styles from "../../booking/components/Booking.module.css";
import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import OfferList from './OfferList';
import { OfferResponseBody } from '../../offerCreation/Types';
import ContextStore from '../../../utils/ContextStore';
import { deleteOffer, getMyOffers } from '../services';
import AlertToast from '../../shared/components/AlertToast';
import { OpenAlert } from '../../shared/Types';

const OfferListDisplayBody = () => {
  const [offers, setOffers] = useState<Array<OfferResponseBody>>([])
  const [openAlert, setOpenAlert] = useState<OpenAlert>({
          open: false,
          message: "",
          severity: "error"
  });
  const store = useContext(ContextStore)
  const _getOffers = async () => {
    const vOffers = await getMyOffers(store)
      if("status" in vOffers){
        setOpenAlert({...openAlert, open: true, message: vOffers.popupMessage})
        return
      }
      
      setOffers(vOffers)
  }
  useEffect(() => {
    _getOffers()
  },[])
  const _deleteOffer = async (offerId: string) => {
    const response = await deleteOffer(store, offerId)
    if("status" in response){
      setOpenAlert({...openAlert, open: true, message: response.popupMessage})
      return
    }
    await _getOffers()
  }
  const [tabSetting, setTabSetting] = useState({
      serviceType : "seeking",
  });

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
              >
                <Tab sx={{fontSize: "1em"}} value={'seeking'} label="Service Seeker"/>
                <Tab sx={{fontSize: "1em"}} value={'offering'} label="Service Provider"/>
              </Tabs>

              <Box sx={{ flex: 1, py: 4}}>  
                <PaginationControlled numberOfItems={offers.filter((offer) => offer.type.displayValue.match(tabSetting.serviceType)).length} maxItemsOnOnePage={25}/>
                <OfferList serviceType={tabSetting.serviceType} offers={offers} deleteOffer={_deleteOffer}/>
              </Box>
        </Stack>

        <AlertToast text={openAlert.message} open={openAlert.open} severity={openAlert.severity} handleClose={() => {
                setOpenAlert({...openAlert, open:false});
            }}/>
    </Stack>

  )
}

export default OfferListDisplayBody