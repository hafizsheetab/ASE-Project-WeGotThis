import React from 'react'
import OfferCardShort from './OfferCardShort';
import { Grid2, Typography } from '@mui/material';
import { OfferResponseBody } from '../../offerCreation/Types';

type PersonalOfferListProps = {
  offers: Array<OfferResponseBody>,
  serviceType : string
}

const PersonalOfferList : React.FC<PersonalOfferListProps> = ({serviceType, offers}) => {

  return (
    <Grid2 container spacing={3}>
      {offers.filter(
        (offer) =>
          offer.type.displayValue.match(serviceType)
      ).length > 0 ? (
        offers
          .filter(
            (offer) =>
              offer.type.displayValue.match(serviceType)
          )
          .map((offer) => (
            <Grid2 size={{xs: 12, sm: 12, md: 6}} container key={"grid-"+offer.id}>
                <OfferCardShort key={"offer-" + offer.id}
                    offer={offer}
                />
            </Grid2>
          ))
      ) : (
        <Typography variant='h6' sx={{ py: 15, textAlign: "center", width: "100%" }} color="text.secondary">
          No offers created.
        </Typography>
      )}
    </Grid2>

  )
}

export default PersonalOfferList