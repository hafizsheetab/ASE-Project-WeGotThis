import PaginationControlled from '../../shared/components/PaginationControls';
import BookingList from "./BookingList";
import styles from "./Booking.module.css";
import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BookingRequestResponseBody } from "../Types";
import ContextStore from "../../../utils/ContextStore";
import { getAllBookingRequest } from "../services";
import { OpenAlert } from '../../shared/Types';
import AlertToast from '../../shared/components/AlertToast';

const BookingListDisplayBody = () => {
  const store = useContext(ContextStore)
  const [openAlert, setOpenAlert] = useState<OpenAlert>({
          open: false,
          message: "",
          severity: "error"
  });
  const [bookingArray, setBookingArray] = useState<Array<BookingRequestResponseBody>>([])
  const [filteredArray, setFilteredArray] = useState<Array<BookingRequestResponseBody>>([])
  const [tabSetting, setTabSetting] = useState({
    serviceType : "my",
    statusType : 'requested'
  });

  const loadBookingArray = async () => {
    const _bookingArray = await getAllBookingRequest(store)

    if("status" in _bookingArray){
      setOpenAlert({...openAlert, open: true, message: _bookingArray.popupMessage})
      return
    }

    console.log("Booking: ", _bookingArray)
    setBookingArray(_bookingArray)
  }

  useEffect(() => {
    loadBookingArray()
  }, [])

  useEffect(() => {
    filterBookings();
  }, [tabSetting.statusType, tabSetting.serviceType, bookingArray]);

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const filterBookings = () => {
    let filtered = bookingArray.filter(
      (booking) =>
      {
        console.log(booking)
        return tabSetting.serviceType === "my" ? booking.user.id === store.context.user.id && booking.status.displayValue === tabSetting.statusType : booking.user.id !== store.context.user.id && booking.status.displayValue === tabSetting.statusType  
      }
    )
    setFilteredArray(filtered)
    console.log("Request", filtered)
  }

  return (
    <Stack className={styles.bookingContent} spacing={3}>
      <Typography variant="h4">Bookings:</Typography>
      <Stack divider={<Divider orientation="horizontal" flexItem />} sx={{width: "100%", py: 2}}>
        <Box>
          <Tabs
              orientation='horizontal'
              centered
              variant="fullWidth"
              value={tabSetting.serviceType}
              onChange={(e, val) => setTabSetting({...tabSetting, serviceType: val})}
            >
              <Tab value={'my'} label="Made by Me"/>
              <Tab value={'notmy'} label="From My Offers"/>
          </Tabs>
        </Box>
        <Box>
          <Tabs
                orientation='horizontal'
                centered
                variant="fullWidth"
                value={tabSetting.statusType}
                onChange={(e, val) => setTabSetting({...tabSetting, statusType: val})}
              >
                <Tab  value={'requested'} label="Requested" {...a11yProps(0)}/>
                <Tab value={'rejected'} label="Rejected" {...a11yProps(1)}/>
                <Tab value={'accepted'} label="Accepted & Ongoing" {...a11yProps(2)} />
                <Tab value={'completed'} label="Completed" {...a11yProps(3)}/>
            </Tabs>
        </Box>

        <Box sx={{ flex: 1, py: 4}}>
          <PaginationControlled numberOfItems={filteredArray.length} maxItemsOnOnePage={25}/>
          <BookingList bookingsArr={filteredArray} statusType={tabSetting.statusType} serviceType={tabSetting.serviceType} loadArray={loadBookingArray}/>
        </Box>
      </Stack>
      
      <AlertToast text={openAlert.message} open={openAlert.open} severity={openAlert.severity} handleClose={() => {
                        setOpenAlert({...openAlert, open:false});
        }}/>
    </Stack>

  )
}

export default BookingListDisplayBody

