import React from 'react'
import BookingCard from './BookingCard';
import { Divider, Stack, Typography } from '@mui/material';

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
    bookingType : string;
}

type BookingListProps = {
    bookingsArr : Booking[],
    bookingType: string,
    serviceType: string, 
}

const BookingList : React.FC<BookingListProps> = ({bookingsArr, bookingType, serviceType}) => {
  return (
    <Stack divider={<Divider orientation="horizontal" flexItem />}>
  {bookingsArr.filter(
    (booking) =>
      booking.bookingType.match(bookingType) &&
      booking.type.match(serviceType)
  ).length > 0 ? (
    bookingsArr
      .filter(
        (booking) =>
          booking.bookingType.match(bookingType) &&
          booking.type.match(serviceType)
      )
      .map((booking) => (
        <BookingCard
          bookingType={booking.bookingType}
          key={booking.offerId}
          title={booking.title}
          requestedOn={booking.requestedOn}
          type={booking.type}
          availability={booking.availability}
          location={booking.location}
          originalPrice={booking.originalPrice}
          priceMode={booking.priceMode}
          newPrice={booking.newPrice}
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