import React from 'react'
import BookingCard from './BookingCard';
import { Divider, Stack, Typography } from '@mui/material';
import { BookingRequestResponseBody } from './Types';

type BookingListProps = {
    bookingsArr : Array<BookingRequestResponseBody>,
    statusType: string,
    serviceType: string, 
    loadArray: () => void
}

const BookingList : React.FC<BookingListProps> = ({bookingsArr, loadArray}) => {
  return (
    <Stack divider={<Divider orientation="horizontal" flexItem />}>
  {bookingsArr.length > 0 ? (
    bookingsArr
      .map((booking) => (
        <BookingCard
          statusType={booking.status.displayValue}
          key={`${booking.offer.id}` }
          title={booking.offer.title}
          requestedOn={new Date(booking.offer.startTime).toLocaleDateString()}
          type={booking.offer.type.displayValue}
          availability={booking.offer.availability ? "Available" : "Unavailable"}
          location={booking.offer.location}
          originalPrice={booking.offer.price}
          priceMode={booking.offer.priceMode.id}
          newPrice={Number(booking.price)}
          requestId={booking.user.id}
          offerId={booking.offer.id}
          userEmail={booking.offer.owner.email}
          hasReview={false}   /// TODO: CHECK IF booking.offer.hasReview & (booking.offer.id == context.user.id)
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