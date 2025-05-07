import { Stack } from '@mui/material'
import OfferList from '../../home/components/OfferList'
import { OfferResponseBody } from '../../offerCreation/Types'

type OfferDisplayProps = {
  offers : Array<OfferResponseBody>
}
const OfferDisplay : React.FC<OfferDisplayProps> = ({offers}) => {
  return (
    <Stack gap={4} sx={{mt:5}}>
        <OfferList offers={offers}/>
    </Stack>
  )
}

export default OfferDisplay