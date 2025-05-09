import { Stack } from '@mui/material'
import OfferList from '../../home/components/OfferList'
import { OfferResponseBody } from '../../offerCreation/Types'
import { useEffect } from 'react'

type OfferDisplayProps = {
  offers : Array<OfferResponseBody>
  userId : string
}

const OfferDisplay : React.FC<OfferDisplayProps> = ({offers, userId}) => {

  useEffect(() => {
    console.log(offers)
    console.log(userId)
  })
  return (
    <Stack gap={4} sx={{mt:5}}>
        <OfferList offers={offers.filter((offer) => offer.owner.id === userId)}/>
    </Stack>
  )
}

export default OfferDisplay