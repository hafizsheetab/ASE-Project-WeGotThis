import React, { useContext } from 'react'
import BookingCard from './BookingCard';
import { Divider, Stack, Typography } from '@mui/material';
import { BookingRequestResponseBody } from './Types';
import ContextStore from '../../utils/ContextStore';

interface Booking {
    id : string;
    title : string;
    requestedOn : string;
    type : string;
    availability : string;
    location : string;
    originalPrice : number; 
    priceMode : number;
    newPrice? : number;
    offerId : string;
    createdUserId : string;
    requestedUserId : string;
    statusType : string;
}

type BookingListProps = {
    bookingsArr : Array<BookingRequestResponseBody>,
    statusType: string,
    serviceType: string, 
    loadArray: () => void
}

const BookingList : React.FC<BookingListProps> = ({bookingsArr, statusType, serviceType, loadArray}) => {
  const filterBookings = () => {
    // console.log(serviceType)
    // console.log(bookingsArr)
    // console.log(statusType)
    return bookingsArr.filter(
      (booking) =>
      {
        
        return serviceType === "my" ? booking.user.id === store.context.user.id && booking.status.displayValue === statusType : booking.user.id !== store.context.user.id && booking.status.displayValue === statusType  
      }
    )
  }
  const store = useContext(ContextStore)
  console.log(filterBookings(), store.context.user.id)
  return (
    <Stack divider={<Divider orientation="horizontal" flexItem />}>
  {filterBookings().length > 0 ? (
    filterBookings()
      .map((booking) => (
        <BookingCard
          statusType={booking.status.displayValue}
          key={booking.user.id}
          title={booking.offer.title}
          requestedOn={booking.offer.startTime.toLocaleString()}
          type={booking.offer.type.displayValue}
          availability={booking.offer.availability ? "Available" : "Unavailable"}
          location={booking.offer.location}
          originalPrice={booking.offer.price}
          priceMode={booking.offer.priceMode.id}
          newPrice={Number(booking.price)}
          requestId={booking.user.id}
          offerId={booking.offer.id}
          userEmail={booking.offer.owner.email}
          owner={serviceType == "my"? true : false}
          loadArray={loadArray}
        />
      ))
  ) : (
    <Typography sx={{ py: 15, textAlign: "center", width: "100%" }} color="text.secondary">
      No bookings found matching your criteria.
    </Typography>
  )}
</Stack>

  )
}

export default BookingList