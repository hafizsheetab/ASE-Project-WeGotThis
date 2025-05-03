import { Stack } from '@mui/material'
import OfferList from '../../home/components/OfferList'

const OfferDisplay = () => {
  return (
    <Stack gap={4} sx={{mt:5}}>
        <OfferList/>
    </Stack>
  )
}

export default OfferDisplay