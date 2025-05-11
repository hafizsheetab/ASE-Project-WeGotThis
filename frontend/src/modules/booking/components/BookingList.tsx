import React, { useEffect } from 'react'
import BookingCard from './BookingCard';
import { Divider, Stack, Typography } from '@mui/material';
import { BookingRequestResponseBody } from '../Types';

type BookingListProps = {
    bookingsArr : Array<BookingRequestResponseBody>,
    statusType: string,
    serviceType: string, 
    loadArray: () => void
}

const BookingList : React.FC<BookingListProps> = ({bookingsArr, loadArray}) => {
  useEffect(() => {
    console.log("BookingList: ", bookingsArr)
  })
  return (
    <Stack divider={<Divider orientation="horizontal" flexItem />}>
  {bookingsArr.length > 0 ? (
    bookingsArr
      .map((booking) => (
        <BookingCard
          statusType={booking.status.displayValue}
          key={`${booking.offer.id}` }
          title={booking.offer.title}
          type={booking.offer.type.displayValue}
          availability={booking.offer.startTime}
          location={booking.offer.location}
          originalPrice={booking.offer.price}
          priceMode={booking.offer.priceMode.id}
          newPrice={Number(booking.price)}
          requestId={booking.user.id}
          offerId={booking.offer.id}
          userEmail={booking.offer.owner.email}
          loadArray={loadArray}
          offerOwnerId={booking.offer.owner.id}
          request={booking}
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